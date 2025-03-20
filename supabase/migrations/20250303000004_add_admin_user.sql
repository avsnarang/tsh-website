-- Insert admin user if not exists (replace with actual admin ID and email)
INSERT INTO users (id, email, role)
VALUES (
    'actual-auth-user-id-here',
    'admin@example.com',
    'admin'
)
ON CONFLICT (id) 
DO UPDATE SET role = 'admin';