import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-client';

const categories = [
  { name: 'Parenting & Early Education', slug: 'parenting-early-education', description: 'Tips and guidance for parents of young children', color: '#00501B', order: 1 },
  { name: 'CBSE Exam Tips', slug: 'cbse-exam-tips', description: 'Study strategies and exam preparation for CBSE students', color: '#A65A20', order: 2 },
  { name: 'Admissions Guidance', slug: 'admissions-guidance', description: 'Information about school admissions and enrollment process', color: '#2563EB', order: 3 },
  { name: 'Career & Higher Education', slug: 'career-higher-education', description: 'Career guidance and higher education pathways', color: '#7C3AED', order: 4 },
  { name: 'School News', slug: 'school-news', description: 'Latest news, achievements, and announcements from TSH', color: '#DC2626', order: 5 },
  { name: 'Holistic Development', slug: 'holistic-development', description: 'Sports, arts, and character building in education', color: '#059669', order: 6 },
];

const blogPosts = [
  {
    title: 'CBSE Board Exam 2026: Complete Preparation Guide for Class 10 & 12 Students',
    slug: 'cbse-board-exam-2026-preparation-guide',
    excerpt: 'Master your CBSE board exams with our comprehensive preparation guide. Learn effective study strategies, time management tips, and subject-wise preparation techniques for Class 10 and 12 students.',
    content: `<p>The CBSE Board Examinations are a crucial milestone in every student's academic journey. With the 2026 exams approaching, it's essential to have a well-structured preparation plan. This comprehensive guide will help Class 10 and Class 12 students prepare effectively for their board exams.</p>

<h2>Understanding the New CBSE Exam Pattern 2026</h2>

<p>CBSE has introduced several reforms for the 2026 examinations, including competency-based questions and internal assessment changes. The key changes include:</p>

<ul>
<li><strong>Two-term examination structure</strong> - Balanced assessment throughout the year</li>
<li><strong>Competency-based questions</strong> - Testing application of concepts, not just memorization</li>
<li><strong>Internal assessment weightage</strong> - Greater emphasis on continuous evaluation</li>
<li><strong>Open-book assessments</strong> - For select subjects focusing on critical thinking</li>
</ul>

<h2>Subject-Wise Preparation Strategy</h2>

<h3>Mathematics</h3>
<p>Mathematics requires consistent practice. Focus on NCERT textbooks first, as 70% of board exam questions come directly from NCERT. Practice previous year papers daily and maintain a formula sheet for quick revision.</p>

<h3>Science (Physics, Chemistry, Biology)</h3>
<p>For science subjects, understanding concepts is more important than rote learning. Create mind maps for each chapter, practice numerical problems regularly, and focus on diagrams for biology.</p>

<h3>English</h3>
<p>Read the prescribed novels and poems thoroughly. Practice letter writing, essay writing, and comprehension passages. Focus on grammar rules and vocabulary building.</p>

<h3>Social Science</h3>
<p>Create timelines for history, practice map work for geography, and understand current events for civics. Use flowcharts and summary notes for quick revision.</p>

<h2>Time Management Tips for Board Exam Preparation</h2>

<p>Effective time management is the key to success. Here's a recommended daily schedule:</p>

<ul>
<li><strong>Morning (5:00 AM - 8:00 AM):</strong> Best time for difficult subjects like Mathematics and Physics</li>
<li><strong>Afternoon (2:00 PM - 5:00 PM):</strong> Practice problems and revision</li>
<li><strong>Evening (6:00 PM - 9:00 PM):</strong> Theory subjects and light reading</li>
<li><strong>Night:</strong> Quick revision of the day's topics before sleep</li>
</ul>

<h2>Last Month Preparation Strategy</h2>

<p>The final month before exams is crucial. Here's how to make the most of it:</p>

<ol>
<li><strong>Week 1-2:</strong> Complete syllabus revision and identify weak areas</li>
<li><strong>Week 3:</strong> Solve previous year papers under exam conditions</li>
<li><strong>Week 4:</strong> Focus on weak areas and practice sample papers</li>
</ol>

<h2>Exam Day Tips</h2>

<ul>
<li>Sleep well the night before - at least 7-8 hours</li>
<li>Eat a light, nutritious breakfast</li>
<li>Reach the exam center 30 minutes early</li>
<li>Read all questions carefully before answering</li>
<li>Manage time wisely - don't spend too long on one question</li>
<li>Review your answers if time permits</li>
</ul>

<h2>Mental Health During Exam Preparation</h2>

<p>While academic preparation is important, mental well-being is equally crucial. Take regular breaks, practice meditation or yoga, and maintain a healthy lifestyle. Remember, exams are important but not everything - your health matters most.</p>

<p>At The Scholars' Home, we provide comprehensive support to our students during board exam preparation, including extra classes, doubt-clearing sessions, and counseling support. Our experienced faculty ensures every student is well-prepared and confident.</p>

<p><strong>Need more guidance?</strong> Contact our academic counselors or visit our campus to learn about our board exam preparation programs.</p>`,
    category_slug: 'cbse-exam-tips',
    author: "The Scholars' Home",
    tags: ['CBSE Board Exam 2026', 'Class 10 Preparation', 'Class 12 Preparation', 'Board Exam Tips', 'Study Guide', 'Exam Strategy'],
    meta_title: 'CBSE Board Exam 2026 Preparation Guide | Class 10 & 12 Tips',
    meta_description: 'Complete CBSE board exam 2026 preparation guide for Class 10 & 12. Expert study strategies, time management tips, and subject-wise preparation techniques.',
    is_featured: true,
    featured_image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80',
  },
  {
    title: 'How to Choose the Right School for Your Child in 2026: A Parent\'s Complete Guide',
    slug: 'how-to-choose-right-school-2026-parents-guide',
    excerpt: 'Choosing the right school for your child is one of the most important decisions you\'ll make. This guide covers everything from curriculum selection to evaluating school infrastructure, helping parents make an informed choice.',
    content: `<p>Choosing the right school for your child is one of the most significant decisions you'll make as a parent. With numerous options available - CBSE, ICSE, State Boards, and International curricula - the decision can feel overwhelming. This comprehensive guide will help you navigate the school selection process in 2026.</p>

<h2>Understanding Different Education Boards in India</h2>

<h3>CBSE (Central Board of Secondary Education)</h3>
<p>CBSE is India's most popular education board, recognized nationwide. It offers:</p>
<ul>
<li>Standardized curriculum across India</li>
<li>Best preparation for competitive exams (JEE, NEET, CUET)</li>
<li>Transferable education for families that relocate frequently</li>
<li>Focus on science and mathematics</li>
<li>Balanced approach to academics and co-curricular activities</li>
</ul>

<h3>ICSE (Indian Certificate of Secondary Education)</h3>
<p>ICSE is known for its comprehensive curriculum with emphasis on English and detailed study of subjects.</p>

<h3>State Boards</h3>
<p>State boards are ideal for students planning to pursue higher education within the same state and for regional language medium education.</p>

<h2>Key Factors to Consider When Choosing a School</h2>

<h3>1. Academic Excellence</h3>
<p>Look at the school's academic track record:</p>
<ul>
<li>Board exam results and pass percentage</li>
<li>Number of students scoring above 90%</li>
<li>Performance in competitive exams</li>
<li>College/university placements of alumni</li>
</ul>

<h3>2. Infrastructure and Facilities</h3>
<p>Modern infrastructure significantly impacts learning. Check for:</p>
<ul>
<li>Well-equipped science and computer labs</li>
<li>Library with diverse reading materials</li>
<li>Sports facilities - playground, indoor games</li>
<li>Smart classrooms with digital learning tools</li>
<li>Safe and hygienic campus environment</li>
</ul>

<h3>3. Teacher Quality</h3>
<p>Teachers make the difference. Consider:</p>
<ul>
<li>Teacher qualifications and experience</li>
<li>Student-teacher ratio (ideal: 20:1 or lower)</li>
<li>Teacher retention rate</li>
<li>Training and development programs for faculty</li>
</ul>

<h3>4. Holistic Development Opportunities</h3>
<p>Education goes beyond textbooks. Look for:</p>
<ul>
<li>Sports programs and physical education</li>
<li>Arts and music education</li>
<li>Clubs and societies</li>
<li>Leadership development programs</li>
<li>Community service initiatives</li>
</ul>

<h3>5. Location and Transportation</h3>
<p>Practical considerations matter:</p>
<ul>
<li>Distance from home (ideally within 30-45 minutes)</li>
<li>Safe transportation options</li>
<li>Traffic and commute time during peak hours</li>
</ul>

<h3>6. Fee Structure and Value</h3>
<p>Understand the complete cost:</p>
<ul>
<li>Tuition fees and payment schedule</li>
<li>Additional charges (transportation, meals, activities)</li>
<li>Hidden costs to watch for</li>
<li>Scholarship opportunities available</li>
</ul>

<h2>Questions to Ask During School Visits</h2>

<p>When visiting schools, ask these important questions:</p>
<ol>
<li>What is your approach to student discipline?</li>
<li>How do you handle students who need extra academic support?</li>
<li>What safety measures are in place on campus?</li>
<li>How do you communicate with parents about student progress?</li>
<li>What technology do you use in classrooms?</li>
<li>How do you support students' mental health?</li>
</ol>

<h2>Red Flags to Watch For</h2>

<ul>
<li>Lack of transparency about fees or policies</li>
<li>Poor maintenance of facilities</li>
<li>Unwillingness to allow campus visits</li>
<li>High teacher turnover rate</li>
<li>Negative reviews from current parents</li>
</ul>

<h2>Making the Final Decision</h2>

<p>After your research:</p>
<ol>
<li>Create a comparison chart of shortlisted schools</li>
<li>Consider your child's learning style and needs</li>
<li>Involve your child in the decision (for older children)</li>
<li>Trust your instincts about the school's culture and values</li>
</ol>

<p>At The Scholars' Home, we invite parents to visit our campuses, meet our faculty, and experience our learning environment firsthand. We believe in complete transparency and open communication with parents.</p>

<p><strong>Schedule a campus visit</strong> to see why families across Himachal Pradesh and Uttarakhand trust us with their children's education.</p>`,
    category_slug: 'admissions-guidance',
    author: "The Scholars' Home",
    tags: ['School Selection', 'CBSE Schools', 'Parent Guide', 'School Admission 2026', 'Education Planning', 'Best Schools India'],
    meta_title: 'How to Choose the Right School for Your Child 2026 | Parent Guide',
    meta_description: 'Complete guide for parents on choosing the right school in 2026. Compare CBSE vs ICSE, evaluate facilities, and make informed decisions for your child\'s education.',
    is_featured: false,
    featured_image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
  },
  {
    title: 'The Importance of Holistic Education: Why Sports and Arts Matter as Much as Academics',
    slug: 'importance-holistic-education-sports-arts-academics',
    excerpt: 'Discover why holistic education combining academics, sports, and arts creates well-rounded individuals. Learn how co-curricular activities boost academic performance, build character, and prepare children for future success.',
    content: `<p>In today's competitive world, academic excellence alone isn't enough. Holistic education - which nurtures the intellectual, physical, emotional, and social development of a child - has become essential for raising well-rounded individuals who can thrive in the 21st century.</p>

<h2>What is Holistic Education?</h2>

<p>Holistic education is an approach that focuses on developing the complete child rather than just academic abilities. It recognizes that children learn best when all aspects of their development are addressed:</p>

<ul>
<li><strong>Intellectual Development:</strong> Academic learning and critical thinking</li>
<li><strong>Physical Development:</strong> Sports, fitness, and healthy habits</li>
<li><strong>Emotional Development:</strong> Self-awareness, resilience, and empathy</li>
<li><strong>Social Development:</strong> Communication, teamwork, and leadership</li>
<li><strong>Creative Development:</strong> Arts, music, and innovative thinking</li>
</ul>

<h2>Why Sports Matter in Education</h2>

<h3>Physical Benefits</h3>
<p>Regular physical activity through sports helps children:</p>
<ul>
<li>Build strong bones and muscles</li>
<li>Maintain healthy weight</li>
<li>Improve cardiovascular health</li>
<li>Develop motor skills and coordination</li>
<li>Boost immunity and overall health</li>
</ul>

<h3>Academic Benefits</h3>
<p>Research shows that students who participate in sports perform better academically:</p>
<ul>
<li>Improved concentration and focus</li>
<li>Better memory retention</li>
<li>Enhanced problem-solving abilities</li>
<li>Higher attendance and engagement in school</li>
<li>Better time management skills</li>
</ul>

<h3>Life Skills Development</h3>
<p>Sports teach invaluable life lessons:</p>
<ul>
<li><strong>Teamwork:</strong> Learning to work together towards common goals</li>
<li><strong>Discipline:</strong> Following rules and maintaining consistency</li>
<li><strong>Resilience:</strong> Bouncing back from defeats and setbacks</li>
<li><strong>Leadership:</strong> Taking responsibility and motivating others</li>
<li><strong>Goal Setting:</strong> Working towards achievements systematically</li>
</ul>

<h2>The Role of Arts in Child Development</h2>

<h3>Visual Arts</h3>
<p>Drawing, painting, and crafts help children:</p>
<ul>
<li>Express emotions and ideas creatively</li>
<li>Develop fine motor skills</li>
<li>Improve visual-spatial abilities</li>
<li>Build patience and attention to detail</li>
</ul>

<h3>Performing Arts</h3>
<p>Music, dance, and drama contribute to:</p>
<ul>
<li>Confidence building and stage presence</li>
<li>Memory enhancement (learning scripts, lyrics)</li>
<li>Emotional expression and regulation</li>
<li>Cultural awareness and appreciation</li>
</ul>

<h2>The Science Behind Holistic Learning</h2>

<p>Neuroscience research supports holistic education:</p>
<ul>
<li>Physical activity increases blood flow to the brain, improving cognitive function</li>
<li>Arts activities develop neural pathways that support learning across subjects</li>
<li>Social activities build emotional intelligence, crucial for success in life</li>
<li>Varied experiences create more neural connections, enhancing overall brain development</li>
</ul>

<h2>How Schools Can Implement Holistic Education</h2>

<h3>Integrated Curriculum</h3>
<p>Schools should integrate sports and arts into the regular curriculum, not treat them as "extra" activities. At The Scholars' Home, we ensure:</p>
<ul>
<li>Daily physical education periods</li>
<li>Weekly arts and music classes</li>
<li>Inter-house competitions in sports and cultural events</li>
<li>Annual sports day and cultural festivals</li>
</ul>

<h3>Qualified Coaches and Instructors</h3>
<p>Just like academic teachers, sports coaches and arts instructors should be qualified professionals who can nurture talent and instill proper techniques.</p>

<h3>Proper Infrastructure</h3>
<p>Schools need:</p>
<ul>
<li>Well-maintained playgrounds and sports facilities</li>
<li>Equipped art rooms and music studios</li>
<li>Auditoriums for performances</li>
<li>Safe spaces for creative exploration</li>
</ul>

<h2>Success Stories: Athletes Who Excel Academically</h2>

<p>Many successful professionals credit their achievements to the discipline and skills learned through sports and arts during their school years. From doctors who were national-level athletes to engineers who excelled in music, the pattern is clear - holistic education creates successful individuals.</p>

<h2>For Parents: Supporting Holistic Development at Home</h2>

<p>Parents can support holistic education by:</p>
<ul>
<li>Encouraging participation in sports and arts, not just academics</li>
<li>Attending school events, sports days, and cultural programs</li>
<li>Celebrating achievements in all areas, not just exam scores</li>
<li>Providing opportunities for creative play at home</li>
<li>Being role models for balanced, healthy lifestyles</li>
</ul>

<p>At The Scholars' Home, we believe that every child has unique talents waiting to be discovered. Our comprehensive sports program, vibrant arts curriculum, and strong academic foundation work together to nurture complete individuals ready to succeed in life.</p>

<p><strong>Visit our campus</strong> to see our sports facilities, art studios, and experience our holistic approach to education.</p>`,
    category_slug: 'holistic-development',
    author: "The Scholars' Home",
    tags: ['Holistic Education', 'Sports in School', 'Arts Education', 'Child Development', 'Co-curricular Activities', 'Student Wellbeing'],
    meta_title: 'Importance of Holistic Education | Sports & Arts in Schools',
    meta_description: 'Learn why holistic education matters. Discover how sports and arts alongside academics create well-rounded students with better academic performance and life skills.',
    is_featured: false,
    featured_image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=80',
  },
  {
    title: 'Managing Exam Stress: A Guide for Students and Parents',
    slug: 'managing-exam-stress-guide-students-parents',
    excerpt: 'Exam stress affects millions of students in India. Learn practical techniques for managing anxiety, building healthy study habits, and supporting your child through stressful exam periods.',
    content: `<p>Exam stress is one of the most common challenges faced by students in India. With the pressure to perform well in board exams, competitive tests, and regular assessments, many students experience anxiety that can affect their performance and well-being. This guide provides practical strategies for both students and parents to manage exam-related stress effectively.</p>

<h2>Understanding Exam Stress</h2>

<p>Exam stress, or test anxiety, is a psychological condition where students experience extreme distress and anxiety before and during exams. While some stress can be motivating, excessive stress can:</p>

<ul>
<li>Impair memory and recall during exams</li>
<li>Cause physical symptoms like headaches, stomach aches, and sleep problems</li>
<li>Lead to negative thought patterns and self-doubt</li>
<li>Affect overall academic performance</li>
<li>Impact mental health and well-being</li>
</ul>

<h2>Signs Your Child May Be Experiencing Exam Stress</h2>

<p>Parents should watch for these warning signs:</p>

<h3>Physical Symptoms</h3>
<ul>
<li>Frequent headaches or stomach aches</li>
<li>Changes in appetite (eating too much or too little)</li>
<li>Sleep disturbances (insomnia or oversleeping)</li>
<li>Fatigue and low energy</li>
<li>Restlessness or fidgeting</li>
</ul>

<h3>Emotional Symptoms</h3>
<ul>
<li>Irritability and mood swings</li>
<li>Excessive worry about exam results</li>
<li>Crying or emotional outbursts</li>
<li>Loss of interest in activities they usually enjoy</li>
<li>Feelings of hopelessness or being overwhelmed</li>
</ul>

<h3>Behavioral Changes</h3>
<ul>
<li>Procrastination or avoidance of studying</li>
<li>Social withdrawal from friends and family</li>
<li>Changes in study habits (either obsessive studying or not studying at all)</li>
<li>Negative self-talk ("I'll never pass", "I'm not smart enough")</li>
</ul>

<h2>Stress Management Techniques for Students</h2>

<h3>1. Effective Study Planning</h3>
<p>A well-organized study plan reduces anxiety:</p>
<ul>
<li>Create a realistic study schedule weeks before exams</li>
<li>Break study material into manageable chunks</li>
<li>Set specific, achievable daily goals</li>
<li>Include regular breaks (use the Pomodoro Technique: 25 minutes study, 5 minutes break)</li>
<li>Avoid cramming the night before exams</li>
</ul>

<h3>2. Physical Wellness</h3>
<p>A healthy body supports a healthy mind:</p>
<ul>
<li><strong>Sleep:</strong> Get 7-8 hours of sleep, especially before exams</li>
<li><strong>Exercise:</strong> 30 minutes of physical activity daily reduces stress hormones</li>
<li><strong>Nutrition:</strong> Eat balanced meals; avoid excessive caffeine and junk food</li>
<li><strong>Hydration:</strong> Drink plenty of water to keep the brain functioning optimally</li>
</ul>

<h3>3. Relaxation Techniques</h3>
<p>Practice these techniques to calm anxiety:</p>
<ul>
<li><strong>Deep Breathing:</strong> Breathe in for 4 counts, hold for 4, exhale for 4</li>
<li><strong>Progressive Muscle Relaxation:</strong> Tense and release muscle groups</li>
<li><strong>Meditation:</strong> Even 10 minutes of mindfulness daily helps</li>
<li><strong>Visualization:</strong> Imagine yourself succeeding in the exam</li>
</ul>

<h3>4. Positive Mindset</h3>
<p>Change your relationship with stress:</p>
<ul>
<li>Replace negative thoughts with positive affirmations</li>
<li>Focus on effort, not just results</li>
<li>Remember: one exam doesn't define your entire future</li>
<li>Learn from mistakes rather than dwelling on them</li>
</ul>

<h2>How Parents Can Help</h2>

<h3>Create a Supportive Environment</h3>
<ul>
<li>Provide a quiet, comfortable study space</li>
<li>Reduce household stress during exam periods</li>
<li>Be available for help without hovering</li>
<li>Ensure basic needs (meals, sleep) are met</li>
</ul>

<h3>Communicate Effectively</h3>
<ul>
<li>Listen without judgment when your child expresses stress</li>
<li>Avoid comparing your child to siblings or other students</li>
<li>Express confidence in their abilities</li>
<li>Discuss their fears and concerns openly</li>
</ul>

<h3>Manage Your Own Anxiety</h3>
<ul>
<li>Children pick up on parental stress - stay calm</li>
<li>Don't project your expectations onto your child</li>
<li>Remember that their worth isn't determined by exam scores</li>
<li>Celebrate effort, not just results</li>
</ul>

<h3>Set Realistic Expectations</h3>
<ul>
<li>Understand your child's capabilities and limitations</li>
<li>Avoid excessive pressure for perfect scores</li>
<li>Focus on personal improvement, not competition</li>
<li>Discuss backup plans to reduce fear of failure</li>
</ul>

<h2>During the Exam</h2>

<p>Tips for managing anxiety in the exam hall:</p>
<ul>
<li>Arrive early to avoid last-minute panic</li>
<li>Take a few deep breaths before starting</li>
<li>Read all questions first, then answer the ones you know well</li>
<li>If you feel anxious, pause and practice deep breathing</li>
<li>Don't worry about what others are doing</li>
<li>If stuck on a question, move on and return later</li>
</ul>

<h2>After the Exam</h2>

<ul>
<li>Avoid post-exam analysis with friends - it increases anxiety</li>
<li>Don't dwell on questions you couldn't answer</li>
<li>Take a break and do something enjoyable</li>
<li>Focus on the next exam, not the one that's done</li>
</ul>

<h2>When to Seek Professional Help</h2>

<p>Consider professional support if your child:</p>
<ul>
<li>Has persistent physical symptoms without medical cause</li>
<li>Shows signs of depression or severe anxiety</li>
<li>Has thoughts of self-harm</li>
<li>Is unable to function normally despite trying self-help strategies</li>
</ul>

<p>At The Scholars' Home, we have trained counselors who support students through exam stress. We also conduct stress management workshops for students and parents throughout the year.</p>

<p><strong>Remember:</strong> Exams are important, but they're not everything. Your child's mental health and well-being are far more valuable than any score.</p>

<p><strong>Need support?</strong> Our school counselors are available to help students and parents navigate exam-related stress.</p>`,
    category_slug: 'parenting-early-education',
    author: "The Scholars' Home",
    tags: ['Exam Stress', 'Student Mental Health', 'Study Tips', 'Parent Guide', 'Anxiety Management', 'Board Exam Preparation'],
    meta_title: 'Managing Exam Stress: Guide for Students & Parents | Tips',
    meta_description: 'Practical guide to managing exam stress for students and parents. Learn stress management techniques, study strategies, and when to seek help for exam anxiety.',
    is_featured: false,
    featured_image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80',
  },
  {
    title: 'Career Guidance After Class 10: Science, Commerce, or Arts - Making the Right Choice',
    slug: 'career-guidance-after-class-10-stream-selection',
    excerpt: 'Confused about which stream to choose after Class 10? This comprehensive guide helps students and parents understand the opportunities in Science, Commerce, and Arts streams to make an informed decision.',
    content: `<p>The transition from Class 10 to Class 11 is a defining moment in a student's academic journey. The stream chosen - Science, Commerce, or Arts (Humanities) - shapes future career opportunities. This guide will help students and parents make an informed decision based on interests, aptitude, and career goals.</p>

<h2>Understanding the Three Streams</h2>

<h3>Science Stream</h3>
<p>Science is the most popular choice among high-scoring students, offering two main tracks:</p>

<h4>PCM (Physics, Chemistry, Mathematics)</h4>
<p><strong>Career Opportunities:</strong></p>
<ul>
<li>Engineering (IIT, NIT, private colleges)</li>
<li>Architecture</li>
<li>Data Science and AI</li>
<li>Research in physical sciences</li>
<li>Defence services</li>
<li>Merchant Navy</li>
<li>Aviation</li>
</ul>

<h4>PCB (Physics, Chemistry, Biology)</h4>
<p><strong>Career Opportunities:</strong></p>
<ul>
<li>Medicine (MBBS, BDS)</li>
<li>Allied Health Sciences (Nursing, Pharmacy, Physiotherapy)</li>
<li>Biotechnology</li>
<li>Research in life sciences</li>
<li>Veterinary sciences</li>
<li>Agriculture and food sciences</li>
</ul>

<h4>PCMB (All Four Subjects)</h4>
<p>Some students opt for all four subjects to keep both engineering and medical options open. However, this requires significantly more effort and time.</p>

<h3>Commerce Stream</h3>
<p>Commerce is ideal for students interested in business, finance, and economics.</p>

<p><strong>Core Subjects:</strong> Accountancy, Business Studies, Economics</p>
<p><strong>Optional:</strong> Mathematics (highly recommended), Informatics Practices</p>

<p><strong>Career Opportunities:</strong></p>
<ul>
<li>Chartered Accountancy (CA)</li>
<li>Company Secretary (CS)</li>
<li>Cost and Management Accountancy (CMA)</li>
<li>Banking and Finance (MBA Finance, CFA)</li>
<li>Business Administration</li>
<li>Stock Market and Investment Banking</li>
<li>Entrepreneurship</li>
<li>Economics and Policy</li>
<li>Actuarial Science</li>
</ul>

<h3>Arts/Humanities Stream</h3>
<p>Often underestimated, Arts offers diverse and rewarding career paths.</p>

<p><strong>Subjects:</strong> History, Political Science, Geography, Psychology, Sociology, Philosophy, Languages, Fine Arts</p>

<p><strong>Career Opportunities:</strong></p>
<ul>
<li>Civil Services (IAS, IPS, IFS)</li>
<li>Law (BA LLB)</li>
<li>Journalism and Mass Communication</li>
<li>Psychology and Counseling</li>
<li>Design (Fashion, Interior, Graphic)</li>
<li>Teaching and Academia</li>
<li>Social Work</li>
<li>Hotel Management and Tourism</li>
<li>Creative Writing and Content</li>
<li>Public Relations</li>
</ul>

<h2>How to Choose the Right Stream</h2>

<h3>1. Assess Your Interests</h3>
<p>Ask yourself:</p>
<ul>
<li>Which subjects do I genuinely enjoy studying?</li>
<li>What topics do I voluntarily read or watch videos about?</li>
<li>What activities make me lose track of time?</li>
<li>What problems do I want to solve in the world?</li>
</ul>

<h3>2. Evaluate Your Aptitude</h3>
<p>Consider:</p>
<ul>
<li>Which subjects come naturally to you?</li>
<li>Are you better with numbers or words?</li>
<li>Do you prefer practical work or theoretical study?</li>
<li>Consider taking an aptitude test for objective assessment</li>
</ul>

<h3>3. Research Career Prospects</h3>
<ul>
<li>Look at job market trends and future demand</li>
<li>Understand the education path for your desired career</li>
<li>Talk to professionals in fields you're interested in</li>
<li>Consider emerging careers (AI, sustainability, mental health)</li>
</ul>

<h3>4. Consider Practical Factors</h3>
<ul>
<li>Competition level for desired colleges/courses</li>
<li>Duration and cost of education</li>
<li>Geographic considerations (willing to relocate?)</li>
<li>Family circumstances and support</li>
</ul>

<h2>Common Mistakes to Avoid</h2>

<h3>1. Following the Crowd</h3>
<p>Don't choose Science just because toppers traditionally do. Many successful people have built great careers through Commerce and Arts.</p>

<h3>2. Parental Pressure</h3>
<p>While parents want the best for their children, forcing a stream based on societal prestige or unfulfilled dreams can lead to unhappiness and failure.</p>

<h3>3. Choosing Based on One Subject</h3>
<p>Liking Mathematics doesn't automatically mean Science is right. Commerce and even some Arts careers need strong math skills.</p>

<h3>4. Ignoring Emerging Fields</h3>
<p>Traditional career paths are changing. New fields like:</p>
<ul>
<li>Data Science (combines science and commerce skills)</li>
<li>UX Design (combines arts and technology)</li>
<li>Environmental Science (combines biology and policy)</li>
<li>Sports Management (combines commerce and passion)</li>
</ul>

<h2>The Truth About Each Stream</h2>

<h3>Science Myths Debunked</h3>
<ul>
<li>"Science guarantees high salary" - Not true. Success in any field comes from excellence and hard work.</li>
<li>"Only intelligent students take Science" - Intelligence isn't stream-specific.</li>
<li>"Science keeps all options open" - Switching to medical from engineering (or vice versa) is very difficult.</li>
</ul>

<h3>Commerce Truths</h3>
<ul>
<li>CA, CS courses are challenging and have low pass rates - but those who clear them have excellent careers.</li>
<li>Commerce with Math opens more doors than without.</li>
<li>The business world values communication skills as much as technical knowledge.</li>
</ul>

<h3>Arts Realities</h3>
<ul>
<li>Civil services remain one of the most prestigious career paths, and many IAS officers come from Arts backgrounds.</li>
<li>Creative careers are increasingly lucrative with digital media growth.</li>
<li>Psychology and counseling are in high demand due to growing mental health awareness.</li>
</ul>

<h2>Making the Final Decision</h2>

<ol>
<li>Take aptitude tests from qualified career counselors</li>
<li>Research thoroughly about careers you're interested in</li>
<li>Talk to professionals in various fields</li>
<li>Consider a trial period - audit some classes if possible</li>
<li>Remember: Stream choice is important but not irreversible</li>
</ol>

<p>At The Scholars' Home, we provide comprehensive career counseling to help students make informed decisions. Our experienced counselors conduct aptitude assessments and guide students through the stream selection process.</p>

<p><strong>Book a career counseling session</strong> with our experts to discover the best path for your future.</p>`,
    category_slug: 'career-higher-education',
    author: "The Scholars' Home",
    tags: ['Career Guidance', 'Stream Selection', 'After Class 10', 'Science vs Commerce', 'Arts Careers', 'Student Career Planning'],
    meta_title: 'Career Guidance After Class 10: Science, Commerce or Arts?',
    meta_description: 'Complete guide to choosing between Science, Commerce, and Arts after Class 10. Understand career opportunities, assess your aptitude, and make the right choice.',
    is_featured: false,
    featured_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
  },
];

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();

    // Check for secret key to prevent unauthorized seeding
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key !== 'seed-tsh-blog-2026') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Insert categories first
    const categoryMap: Record<string, string> = {};

    for (const category of categories) {
      const { data: existingCat } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', category.slug)
        .single();

      if (existingCat) {
        categoryMap[category.slug] = existingCat.id;
      } else {
        const { data: newCat, error } = await supabase
          .from('blog_categories')
          .insert([{
            ...category,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }])
          .select('id')
          .single();

        if (error) throw error;
        if (newCat) categoryMap[category.slug] = newCat.id;
      }
    }

    // Insert blog posts
    const insertedPosts = [];

    for (const post of blogPosts) {
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', post.slug)
        .single();

      if (existingPost) {
        insertedPosts.push({ slug: post.slug, status: 'already_exists' });
        continue;
      }

      const categoryId = categoryMap[post.category_slug];
      const now = new Date().toISOString();

      const { data: newPost, error } = await supabase
        .from('blog_posts')
        .insert([{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featured_image: post.featured_image,
          category_id: categoryId,
          author: post.author,
          tags: post.tags,
          meta_title: post.meta_title,
          meta_description: post.meta_description,
          is_published: true,
          is_featured: post.is_featured,
          view_count: Math.floor(Math.random() * 500) + 100, // Random initial views for social proof
          published_at: now,
          created_at: now,
          updated_at: now,
        }])
        .select('id, slug')
        .single();

      if (error) {
        insertedPosts.push({ slug: post.slug, status: 'error', error: error.message });
      } else {
        insertedPosts.push({ slug: post.slug, status: 'created', id: newPost?.id });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Blog seeded successfully',
      categories: Object.keys(categoryMap).length,
      posts: insertedPosts,
    });
  } catch (error) {
    console.error('Seed Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to seed blog',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST with ?key=seed-tsh-blog-2026 to seed the blog',
    posts: blogPosts.map(p => ({ title: p.title, slug: p.slug })),
  });
}
