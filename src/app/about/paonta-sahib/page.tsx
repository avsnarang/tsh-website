import type { Metadata } from 'next';
import { paontaSahibPageSchema } from '@/lib/schemas/localLandmarkSchema';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'About Paonta Sahib - History, Education & Attractions',
  description: 'Discover Paonta Sahib, Himachal Pradesh - a historic Sikh pilgrimage town on the Yamuna River, home to Gurudwara Paonta Sahib and leading educational institutions like The Scholars\' Home.',
  keywords: [
    'Paonta Sahib',
    'Paonta Sahib Himachal Pradesh',
    'what is Paonta Sahib famous for',
    'Gurudwara Paonta Sahib',
    'schools in Paonta Sahib',
    'The Scholars Home Paonta Sahib',
    'The Scholars Home, Paonta Sahib',
    'The Scholars\' Home, Paonta Sahib',
    'education in Paonta Sahib',
    'Yamuna River Paonta Sahib',
  ],
  openGraph: {
    title: 'About Paonta Sahib - History, Education & Attractions',
    description: 'Explore Paonta Sahib: Sikh pilgrimage site, scenic Yamuna River views, and quality education at The Scholars\' Home.',
    type: 'article',
  },
};

export default function PaontaSahibPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-800 to-green-900 text-white pt-48 md:pt-36 pb-20">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Paonta Sahib
            </h1>
            <p className="text-xl text-green-100 max-w-3xl">
              A historic town in Himachal Pradesh known for its rich Sikh heritage,
              natural beauty, and quality educational institutions
            </p>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 py-16">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What is Paonta Sahib Famous For?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Paonta Sahib is a historic town located in the Sirmaur district of Himachal Pradesh, India.
              Situated on the banks of the scenic Yamuna River, this town holds immense religious significance
              as a major Sikh pilgrimage destination and has emerged as an important educational and
              industrial center in the region.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              The town is renowned for the sacred <strong>Gurudwara Paonta Sahib</strong>, where the tenth
              Sikh Guru, <strong>Guru Gobind Singh</strong>, resided for several years and composed significant
              portions of the Dasam Granth. Today, Paonta Sahib is also known for its thriving pharmaceutical
              industry and quality educational institutions that serve students from across the region.
            </p>
          </section>

          {/* Key Highlights */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Key Reasons for Paonta Sahib&apos;s Fame
            </h2>

            <div className="space-y-8">
              {/* Religious Importance */}
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Religious & Historical Significance
                </h3>
                <p className="text-gray-700">
                  Paonta Sahib is one of the most sacred sites in Sikhism. Guru Gobind Singh lived here
                  from 1685 to 1689, establishing the foundation for the town. The Gurudwara complex
                  houses precious artifacts including the Guru&apos;s weapons, pens, and the Dasam Granth
                  he wrote during his stay.
                </p>
              </div>

              {/* Natural Beauty */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Natural Beauty & Yamuna River
                </h3>
                <p className="text-gray-700">
                  Located on the banks of the Yamuna River, Paonta Sahib offers picturesque views of
                  hills and forests. The serene riverside location attracts visitors seeking spiritual
                  and natural tranquility. The town serves as a gateway to the beautiful landscapes
                  of Himachal Pradesh.
                </p>
              </div>

              {/* Education */}
              <div className="border-l-4 border-amber-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Educational Hub
                </h3>
                <p className="text-gray-700">
                  Paonta Sahib has emerged as a significant educational center in the region.
                  <strong> The Scholars&apos; Home</strong>, established in 2003, is the town&apos;s premier
                  CBSE-affiliated school with a sprawling 28-acre campus. As one of the best schools
                  in Himachal Pradesh, it attracts students from Paonta Sahib, Sirmaur district,
                  and neighboring states including Uttarakhand and Uttar Pradesh. The school&apos;s
                  award-winning academic programs and modern facilities have made quality education
                  a defining feature of the town.
                </p>
              </div>

              {/* Industry */}
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Industrial Growth
                </h3>
                <p className="text-gray-700">
                  Paonta Sahib is a major pharmaceutical and cement manufacturing hub. The town hosts
                  numerous pharmaceutical companies, contributing significantly to India&apos;s healthcare
                  sector and providing employment opportunities to thousands of residents.
                </p>
              </div>
            </div>
          </section>

          {/* Attractions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Key Attractions in Paonta Sahib
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Gurudwara Paonta Sahib</h3>
                <p className="text-gray-600 text-sm">
                  The main pilgrimage site with historic artifacts and peaceful atmosphere
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Shri Talab Asthan</h3>
                <p className="text-gray-600 text-sm">
                  Historic site where Guru Gobind Singh distributed salaries to soldiers
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Kavi Darbar</h3>
                <p className="text-gray-600 text-sm">
                  The venue where poetry sessions and literary gatherings were held
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Weapons Museum</h3>
                <p className="text-gray-600 text-sm">
                  Displays Guru Gobind Singh&apos;s personal arms and implements
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Yamuna River Ghats</h3>
                <p className="text-gray-600 text-sm">
                  Scenic riverfront offering peaceful views and spiritual atmosphere
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">The Scholars&apos; Home Campus</h3>
                <p className="text-gray-600 text-sm">
                  A 28-acre educational campus representing modern Paonta Sahib
                </p>
              </div>
            </div>
          </section>

          {/* Education in Paonta Sahib */}
          <section className="mb-12 bg-green-50 -mx-4 px-4 py-8 md:mx-0 md:px-8 md:rounded-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Education in Paonta Sahib
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Paonta Sahib offers excellent educational opportunities, with <strong>The Scholars&apos; Home</strong> being
              the flagship institution. Established in 2003, TSH has grown to become one of the most
              respected CBSE schools in Himachal Pradesh.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700">2000+</div>
                <div className="text-sm text-gray-600">Students Enrolled</div>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700">28</div>
                <div className="text-sm text-gray-600">Acre Campus</div>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700">20+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
              >
                Learn About The Scholars&apos; Home
              </a>
            </div>
          </section>

          {/* How to Reach */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Reach Paonta Sahib
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>By Road:</strong> Paonta Sahib is well-connected by road to major cities.
                It is approximately 45 km from Dehradun, 270 km from Delhi, and 120 km from Chandigarh.
              </p>
              <p>
                <strong>By Rail:</strong> The nearest railway station is Dehradun (45 km).
                From Dehradun, regular buses and taxis are available to Paonta Sahib.
              </p>
              <p>
                <strong>By Air:</strong> Jolly Grant Airport in Dehradun (55 km) is the nearest airport,
                with regular flights from Delhi and other major cities.
              </p>
            </div>
          </section>
        </article>

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(paontaSahibPageSchema),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
