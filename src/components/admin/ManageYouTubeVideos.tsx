import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Container from '../ui/Container';
import { Plus, Pencil, X, ArrowUp, ArrowDown, ArrowLeft, Video, AlertTriangle, Trash2 } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';
import { motion, AnimatePresence } from 'framer-motion';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string | null;
  embed_code: string;
  position: number;
  is_visible: boolean;
}

export default function ManageYouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [editingVideo, setEditingVideo] = useState<YouTubeVideo | null>(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    embed_code: '',
    is_visible: true
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('youtube_videos')
      .select('*')
      .order('position');
    
    if (error) {
      setError('Failed to fetch videos');
    } else {
      setVideos(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingVideo) {
        const { error } = await supabase
          .from('youtube_videos')
          .update({
            title: formData.title,
            description: formData.description,
            embed_code: formData.embed_code,
            is_visible: formData.is_visible
          })
          .eq('id', editingVideo.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('youtube_videos')
          .insert([{
            ...formData,
            position: videos.length
          }]);

        if (error) throw error;
      }

      await fetchVideos();
      resetForm();
    } catch (error) {
      setError('Failed to save video');
    }
  };

  const handleMove = async (video: YouTubeVideo, direction: 'up' | 'down') => {
    const currentIndex = videos.findIndex(v => v.id === video.id);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= videos.length) return;

    // Create array of all positions that need to be updated
    const updates = videos.map((v, index) => {
      if (index === currentIndex) return { id: v.id, position: newIndex };
      if (index === newIndex) return { id: v.id, position: currentIndex };
      return { id: v.id, position: index };
    });

    try {
      // Update all positions in a single batch
      const { error } = await supabase
        .from('youtube_videos')
        .upsert(updates.map(u => ({
          id: u.id,
          position: u.position
        })));

      if (error) throw error;
      await fetchVideos();
    } catch (error) {
      setError('Failed to update positions');
    }
  };

  const handlePositionChange = async (video: YouTubeVideo, newPosition: number) => {
    try {
      const oldPosition = video.position;
      const updates = videos.map(v => {
        if (v.id === video.id) {
          return { id: v.id, position: newPosition };
        } else if (
          (oldPosition < newPosition && v.position <= newPosition && v.position > oldPosition) ||
          (oldPosition > newPosition && v.position >= newPosition && v.position < oldPosition)
        ) {
          return {
            id: v.id,
            position: oldPosition < newPosition ? v.position - 1 : v.position + 1
          };
        }
        return { id: v.id, position: v.position };
      });

      const { error } = await supabase
        .from('youtube_videos')
        .upsert(updates.map(u => ({
          id: u.id,
          position: u.position
        })));

      if (error) throw error;
      await fetchVideos();
    } catch (error) {
      setError('Failed to update position');
    }
  };

  const handleDelete = async (video: YouTubeVideo) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    
    try {
      const { error } = await supabase
        .from('youtube_videos')
        .delete()
        .eq('id', video.id);

      if (error) throw error;
      
      // Update positions of remaining videos
      const remainingVideos = videos.filter(v => v.id !== video.id);
      const updates = remainingVideos.map((v, index) => ({
        id: v.id,
        position: index
      }));

      await supabase
        .from('youtube_videos')
        .upsert(updates);

      await fetchVideos();
    } catch (error) {
      setError('Failed to delete video');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      embed_code: '',
      is_visible: true
    });
    setEditingVideo(null);
  };

  return (
    <div className="relative min-h-screen bg-neutral-light pt-32 pb-24">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container>
        <div className="relative max-w-full mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-between gap-4 mb-8">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 text-green hover:text-green-dark transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back to Dashboard
                </Link>
              </div>

              <div className="flex flex-col items-center gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full"
                >
                  <Video className="h-4 w-4" />
                  <span className="font-semibold">YouTube Gallery Management</span>
                </motion.div>
              </div>
              
              <TextReveal>
                <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
                  Manage <span className="text-green">YouTube Videos</span>
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-neutral-dark/70 text-lg max-w-2xl mx-auto">
                  Add, edit, and arrange videos in the YouTube gallery
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          {/* Add Video Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex justify-end"
          >
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-xl hover:bg-green-dark transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Video</span>
            </button>
          </motion.div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Videos List */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-2xl shadow-lg h-fit"
                >
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <select
                        value={video.position}
                        onChange={(e) => handlePositionChange(video, parseInt(e.target.value))}
                        className="w-14 p-1.5 border rounded-lg bg-neutral-light text-sm"
                      >
                        {videos.map((_, i) => (
                          <option key={i} value={i}>{i + 1}</option>
                        ))}
                      </select>
                      <div className="flex-1 min-w-0"> {/* prevent text overflow */}
                        <h3 className="text-base font-semibold text-neutral-dark mb-1 truncate">
                          {video.title}
                        </h3>
                        {video.description && (
                          <p className="text-sm text-neutral-dark/70 line-clamp-2">
                            {video.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0"> {/* prevent buttons from shrinking */}
                      <button
                        onClick={() => handleMove(video, 'up')}
                        disabled={index === 0}
                        className="p-1.5 text-neutral-dark/70 hover:text-neutral-dark disabled:opacity-50 rounded-lg transition-colors"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMove(video, 'down')}
                        disabled={index === videos.length - 1}
                        className="p-1.5 text-neutral-dark/70 hover:text-neutral-dark disabled:opacity-50 rounded-lg transition-colors"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingVideo(video);
                          setFormData({
                            title: video.title,
                            description: video.description || '',
                            embed_code: video.embed_code,
                            is_visible: video.is_visible
                          });
                          setShowForm(true);
                        }}
                        className="p-1.5 text-neutral-dark/70 hover:text-neutral-dark rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(video)}
                        className="p-1.5 text-red-500 hover:text-red-600 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden bg-neutral-light" 
                    dangerouslySetInnerHTML={{ __html: video.embed_code }} 
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* Create/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-display text-neutral-dark">
                    {editingVideo ? 'Edit Video' : 'Add New Video'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="p-2 text-neutral-dark/70 hover:text-neutral-dark rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={formData.title}
                      onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-3 border rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <textarea
                      placeholder="Description"
                      value={formData.description}
                      onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-3 border rounded-xl h-24"
                    />
                  </div>
                  
                  <div>
                    <textarea
                      placeholder="Embed Code"
                      value={formData.embed_code}
                      onChange={e => setFormData(prev => ({ ...prev, embed_code: e.target.value }))}
                      className="w-full p-3 border rounded-xl font-mono h-32"
                    />
                  </div>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_visible}
                      onChange={e => setFormData(prev => ({ ...prev, is_visible: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span className="text-neutral-dark">Visible on public gallery</span>
                  </label>
                  
                  <div className="flex gap-2 pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green text-white rounded-xl hover:bg-green-dark transition-colors"
                    >
                      {editingVideo ? 'Update' : 'Add'} Video
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                      }}
                      className="px-6 py-3 bg-neutral-dark/10 text-neutral-dark rounded-xl hover:bg-neutral-dark/20 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
