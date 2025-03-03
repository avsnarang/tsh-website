@@ .. @@
   const [formData, setFormData] = useState<FormData>({
     title: '',
     description: '',
     date: '',
     campus: '',
+    primary_image_id: undefined,
     images: [{ url: '', caption: '' }]
   });
@@ .. @@
             title: formData.title,
             description: formData.description,
             date: formData.date,
-            campus: formData.campus
+            campus: formData.campus,
+            primary_image_id: formData.primary_image_id
           })
           .eq('id', editingEvent.id);
@@ .. @@
             title: formData.title,
             description: formData.description,
             date: formData.date,
-            campus: formData.campus
+            campus: formData.campus,
+            primary_image_id: null // Will be updated after images are inserted
           })
           .select()
           .single();
@@ .. @@
         if (imagesError) throw imagesError;
+        
+        // Update primary image if first image exists
+        const { data: imageData } = await supabase
+          .from('gallery_images')
+          .select('id')
+          .eq('event_id', eventData.id)
+          .order('created_at', { ascending: true })
+          .limit(1)
+          .single();
+
+        if (imageData) {
+          const { error: updateError } = await supabase
+            .from('gallery_events')
+            .update({ primary_image_id: imageData.id })
+            .eq('id', eventData.id);
+
+          if (updateError) throw updateError;
+        }
       }
@@ .. @@
                       <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden">
                         <img
                           src={image.image_url}
-                          alt={image.caption}
-                          className="w-full h-full object-cover"
+                          alt={image.caption || ''}
+                          className="w-14 h-14 object-cover"
                         />
+                        {event.primary_image_id === image.id && (
+                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
+                            <span className="text-xs text-white bg-primary/80 px-2 py-1 rounded-full">Primary</span>
+                          </div>
+                        )}
                         {image.caption && (
                           <div className="absolute inset-x-0 bottom-0 bg-neutral-dark/60 text-neutral-light p-2 text-sm">
                             {image.caption}
@@ .. @@
                       <div>
                         <label className="block text-neutral-dark mb-2">Image URL</label>
+                        <div className="flex gap-4">
                         <input
                           type="url"
                           value={image.url}
                           onChange={(e) => updateImageField(index, 'url', e.target.value)}
                           placeholder="https://example.com/image.jpg"
-                          className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
+                          className="flex-grow px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                           required
                           onBlur={(e) => {
                             const url = e.target.value.trim();
@@ -524,6 +524,14 @@
                               setError('Please enter a valid URL starting with http:// or https://');
                             }
                           }}
                         />
+                        <Button
+                          type="button"
+                          onClick={() => setFormData(prev => ({ ...prev, primary_image_id: image.url ? index.toString() : undefined }))}
+                          variant={formData.primary_image_id === index.toString() ? 'primary' : 'outline'}
+                          className="shrink-0"
+                        >
+                          Set as Primary
+                        </Button>
+                        </div>
                         {image.url && (
                           <img src={image.url} alt="" className="mt-2 w-14 h-14 object-cover rounded" />
                         )}