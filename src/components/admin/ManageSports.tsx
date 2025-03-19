import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash, Save } from 'lucide-react';

interface SportFacility {
  name: string;
  image: string;
  features: string[];
}

interface SportData {
  id: string;
  name: string;
  category: string;
  levels: string[];
  schedule: string;
  coach: string;
  achievements: string;
  image: string;
  description: string;
  facilities: SportFacility[];
  training_schedule: Record<string, string[]>;
}

export default function ManageSports() {
  const [sports, setSports] = useState<SportData[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SportData>>({});

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    const { data, error } = await supabase
      .from('sports')
      .select('*');
    
    if (error) {
      console.error('Error fetching sports:', error);
      return;
    }
    
    setSports(data);
  };

  const handleSave = async (sportData: Partial<SportData>) => {
    const { data, error } = await supabase
      .from('sports')
      .upsert([sportData])
      .select();

    if (error) {
      console.error('Error saving sport:', error);
      return;
    }

    await fetchSports();
    setIsEditing(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display">Manage Sports Programs</h2>
        <button
          onClick={() => setIsEditing('new')}
          className="btn bg-green text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Sport
        </button>
      </div>

      {/* Sport List */}
      <div className="space-y-4">
        {sports.map(sport => (
          <div key={sport.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-display">{sport.name}</h3>
                <p className="text-neutral-dark/70">{sport.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(sport.id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(sport.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <SportEditModal
          sportId={isEditing}
          onSave={handleSave}
          onClose={() => setIsEditing(null)}
          initialData={sports.find(s => s.id === isEditing)}
        />
      )}
    </div>
  );
}