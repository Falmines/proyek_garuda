(() => {
  const messages = [
    ['Bahasa', 'Language', '言語'],
    ['Pilih bahasa', 'Choose language', '言語を選択'],
    ['Beranda', 'Home', 'ホーム'],
    ['Profil', 'About', 'プロフィール'],
    ['Portofolio', 'Portfolio', 'ポートフォリオ'],
    ['Pesawat Futuristik', 'Futuristic Aircraft', '未来型航空機'],
    ['Helikopter Futuristik', 'Futuristic Helicopters', '未来型ヘリコプター'],
    ['Kendaraan Darat', 'Land Vehicles', '陸上車両'],
    ['Informasi Aset', 'Asset Information', '資産情報'],
    ['Kontak', 'Contact', 'お問い合わせ'],
    ['Hubungi via WhatsApp', 'Contact us on WhatsApp', 'WhatsAppで問い合わせ'],
    ['PROFIL ORGANISASI • INOVASI • REKAYASA', 'ORGANIZATION PROFILE • INNOVATION • ENGINEERING', '組織紹介 • イノベーション • エンジニアリング'],
    ['Teknologi untuk masa depan', 'Technology for the future', '未来のためのテクノロジー'],
    ['Proyek Garuda adalah platform independen untuk mengeksplorasi dan mendokumentasikan gagasan teknologi. Melalui konsep, riset awal, dan komunikasi visual, kami membuka ruang bagi pembelajaran serta dialog yang bertanggung jawab dan berorientasi pada manusia.', 'Proyek Garuda is an independent platform for exploring and documenting technology ideas. Through concepts, preliminary research, and visual communication, we create space for learning and responsible, people-centered dialogue.', 'Proyek Garudaは、テクノロジーのアイデアを探求・記録する独立したプラットフォームです。コンセプト、初期調査、ビジュアルコミュニケーションを通じて、人を中心とした責任ある学びと対話の場を提供します。'],
    ['Tentang Proyek Garuda', 'About Proyek Garuda', 'Proyek Garudaについて'],
    ['Lihat portofolio', 'Explore the portfolio', 'ポートフォリオを見る'],
    ['INOVASI', 'INNOVATION', 'イノベーション'],
    ['REKAYASA', 'ENGINEERING', 'エンジニアリング'],
    ['KOLABORASI', 'COLLABORATION', 'コラボレーション'],
    ['PEMBELAJARAN', 'LEARNING', '学び'],
    ['BERPIKIR KRITIS', 'THINK CRITICALLY', '批判的に考える'],
    ['MERANCANG BIJAK', 'DESIGN WISELY', '賢く設計する'],
    ['MEMBUKA PELUANG', 'OPENING OPPORTUNITIES', '可能性を広げる'],
    ['Menghubungkan gagasan, teknologi, dan manusia', 'Connecting ideas, technology, and people', 'アイデア、テクノロジー、人をつなぐ'],
    ['Visual konsep teknologi Proyek Garuda', 'Proyek Garuda technology concept visual', 'Proyek Garudaのテクノロジーコンセプトビジュアル'],
    ['KONSEP TEKNOLOGI', 'TECHNOLOGY CONCEPT', 'テクノロジーコンセプト'],
    ['Proyek Garuda merupakan inisiatif independen untuk eksplorasi konsep dan edukasi. Kami bukan lembaga pemerintah atau program resmi, serta tidak menyatakan afiliasi dengan pihak mana pun.', 'Proyek Garuda is an independent initiative for concept exploration and education. We are not a government agency or official program and do not claim affiliation with any organization.', 'Proyek Garudaはコンセプトの探求と教育を目的とする独立した取り組みです。政府機関や公式プログラムではなく、いかなる組織との提携も表明していません。'],
    ['INFORMASI ASET', 'ASSET INFORMATION', '資産情報'],
    ['Informasi kendaraan dan properti', 'Vehicle and property information', '車両・不動産情報'],
    ['Informasi mengenai kendaraan dan properti yang tersedia dapat dilihat pada halaman aset.', 'View available vehicle and property information on the assets page.', '利用可能な車両と不動産の情報は、資産ページでご覧いただけます。'],
    ['Jelajahi informasi aset', 'Explore asset information', '資産情報を見る'],
    ['TENTANG KAMI', 'ABOUT US', '私たちについて'],
    ['Mengenalkan gagasan. Membuka perspektif.', 'Introducing ideas. Opening perspectives.', 'アイデアを紹介し、視野を広げる。'],
    ['Proyek Garuda menyusun dan menyajikan konsep teknologi sebagai bahan eksplorasi, komunikasi visual, dan pembelajaran. Kami mengangkat beragam bidang untuk mendorong pemahaman yang lebih luas tentang peluang, tantangan, keselamatan, dan tanggung jawab dalam pengembangan teknologi.', 'Proyek Garuda develops and presents technology concepts for exploration, visual communication, and learning. We cover diverse fields to deepen understanding of the opportunities, challenges, safety, and responsibilities involved in technology development.', 'Proyek Garudaは、探求、ビジュアルコミュニケーション、学習のためにテクノロジーのコンセプトを企画・紹介します。幅広い分野を取り上げ、技術開発における機会、課題、安全性、責任への理解を深めます。'],
    ['Kenali profil dan pendekatan kami', 'Learn about our profile and approach', '私たちの概要と取り組み方を見る'],
    ['Ringkasan portofolio', 'Portfolio overview', 'ポートフォリオ概要'],
    ['Konsep dalam portofolio', 'Concepts in the portfolio', 'ポートフォリオ内のコンセプト'],
    ['Bidang yang dieksplorasi', 'Fields explored', '探求する分野'],
    ['Ruang informasi terintegrasi', 'Integrated information hub', '統合情報スペース'],
    ['Peluang untuk terus belajar', 'Opportunities to keep learning', '学び続ける機会'],
    ['VISI, MISI, DAN PRINSIP', 'VISION, MISSION, AND PRINCIPLES', 'ビジョン・ミッション・原則'],
    ['Menjelajahi masa depan dengan tanggung jawab.', 'Exploring the future responsibly.', '責任を持って未来を探求する。'],
    ['Mendorong eksplorasi teknologi yang bermakna.', 'Encouraging meaningful technology exploration.', '意義ある技術探求を促進する。'],
    ['Menghadirkan gagasan lintas bidang yang dapat memperkaya pembelajaran, membuka dialog, dan menginspirasi pemecahan masalah.', 'Bringing forward cross-disciplinary ideas that enrich learning, open dialogue, and inspire problem-solving.', '学びを深め、対話を促し、問題解決のヒントとなる分野横断的なアイデアを紹介します。'],
    ['Menyampaikan konsep secara jelas dan terbuka.', 'Presenting concepts clearly and openly.', 'コンセプトを明確かつオープンに伝える。'],
    ['Menjelaskan latar belakang, arah, status, dan batasan setiap konsep agar pembaca dapat memahaminya secara utuh.', 'Explaining the background, direction, status, and limitations of each concept so readers can understand it fully.', '各コンセプトの背景、方向性、状況、限界を説明し、読者が全体像を理解できるようにします。'],
    ['Mengutamakan manusia, keselamatan, dan integritas.', 'Putting people, safety, and integrity first.', '人、安全、誠実さを最優先する。'],
    ['Menjunjung transparansi dan tanggung jawab, serta membedakan dengan tegas antara gagasan konseptual dan penerapan nyata.', 'Upholding transparency and responsibility while clearly distinguishing conceptual ideas from real-world implementation.', '透明性と責任を重んじ、コンセプト上のアイデアと実際の導入を明確に区別します。'],
    ['PORTOFOLIO DIRGANTARA', 'AEROSPACE PORTFOLIO', '航空宇宙ポートフォリオ'],
    ['Konsep Pesawat Futuristik', 'Futuristic Aircraft Concepts', '未来型航空機コンセプト'],
    ['Rangkaian konsep pesawat dalam bentuk ilustrasi dan poster. Nama serta desain bersifat fiktif untuk eksplorasi dan pembelajaran, bukan spesifikasi teknis atau program nyata.', 'A series of aircraft concepts presented as illustrations and posters. Names and designs are fictional for exploration and learning, not technical specifications or real programs.', 'イラストやポスターで紹介する航空機コンセプトです。名称とデザインは探求・学習用の架空のものであり、技術仕様や実際の計画ではありません。'],
    ['Navigasi seri pesawat futuristik', 'Futuristic aircraft series navigation', '未来型航空機シリーズのナビゲーション'],
    ['Kembali ke daftar seri', 'Back to series list', 'シリーズ一覧に戻る'],
    ['Perbesar poster', 'Enlarge poster', 'ポスターを拡大'],
    ['Poster konsep', 'Concept poster', 'コンセプトポスター'],
    ['PORTOFOLIO DIRGANTARA', 'AEROSPACE PORTFOLIO', '航空宇宙ポートフォリオ'],
    ['Konsep Helikopter Futuristik', 'Futuristic Helicopter Concepts', '未来型ヘリコプターコンセプト'],
    ['Kumpulan ilustrasi helikopter futuristik yang disusun dalam tiga seri. Seluruh nama dan desain merupakan konsep fiksi untuk inspirasi dan pembelajaran, bukan spesifikasi atau program nyata.', 'A collection of futuristic helicopter illustrations arranged in three series. All names and designs are fictional concepts for inspiration and learning, not specifications or real programs.', '3つのシリーズで構成された未来型ヘリコプターのイラスト集です。名称とデザインはすべて着想と学習のための架空のコンセプトであり、仕様や実際の計画ではありません。'],
    ['Navigasi seri helikopter futuristik', 'Futuristic helicopter series navigation', '未来型ヘリコプターシリーズのナビゲーション'],
    ['PORTOFOLIO KENDARAAN DARAT', 'LAND VEHICLE PORTFOLIO', '陸上車両ポートフォリオ'],
    ['Konsep Kendaraan Darat Futuristik', 'Futuristic Land Vehicle Concepts', '未来型陸上車両コンセプト'],
    ['Rangkaian ilustrasi kendaraan darat futuristik yang disusun dalam beberapa seri. Poster dapat diperbesar untuk dilihat secara utuh. Seluruh nama dan desain bersifat fiktif untuk inspirasi dan pembelajaran, bukan spesifikasi atau program nyata.', 'A series of futuristic land vehicle illustrations. Enlarge each poster to view it in full. All names and designs are fictional for inspiration and learning, not specifications or real programs.', 'シリーズごとにまとめた未来型陸上車両のイラストです。ポスターを拡大して全体をご覧いただけます。名称とデザインはすべて着想と学習のための架空のものであり、仕様や実際の計画ではありません。'],
    ['Navigasi seri kendaraan darat futuristik', 'Futuristic land vehicle series navigation', '未来型陸上車両シリーズのナビゲーション'],
    ['PENDEKATAN KAMI', 'OUR APPROACH', '私たちの取り組み方'],
    ['Proses terarah, informasi yang mudah dipahami.', 'A guided process and clear information.', '明確なプロセスとわかりやすい情報。'],
    ['Setiap konsep disusun melalui tahapan yang mendorong kejelasan, keterbukaan, dan pertimbangan atas dampaknya.', 'Each concept follows a process that promotes clarity, openness, and consideration of its impact.', '各コンセプトは、明確さ、透明性、影響への配慮を促す段階的なプロセスでまとめられています。'],
    ['Memahami konteks', 'Understanding the context', '背景を理解する'],
    ['Mengidentifikasi kebutuhan, peluang, serta latar belakang gagasan.', 'Identifying needs, opportunities, and the background of an idea.', 'ニーズ、機会、アイデアの背景を特定します。'],
    ['Menyusun konsep', 'Developing the concept', 'コンセプトをまとめる'],
    ['Merumuskan arah pengembangan dengan mempertimbangkan manfaat dan keselamatan.', 'Defining a development direction while considering benefits and safety.', '利点と安全性を考慮しながら、開発の方向性を定めます。'],
    ['Mendokumentasikan', 'Documenting', '記録する'],
    ['Menjelaskan tujuan, status, dan batasan konsep secara informatif.', 'Clearly documenting a concept’s purpose, status, and limitations.', 'コンセプトの目的、状況、限界をわかりやすく記録します。'],
    ['Membuka dialog', 'Opening dialogue', '対話を開く'],
    ['Menerima pertanyaan dan masukan sebagai bagian dari proses belajar.', 'Welcoming questions and feedback as part of the learning process.', '質問や意見を学びのプロセスの一部として受け入れます。'],
    ['JEJARING DAN KOLABORASI', 'NETWORKS AND COLLABORATION', 'ネットワークとコラボレーション'],
    ['Membangun ruang dialog lintas bidang.', 'Building space for cross-disciplinary dialogue.', '分野を超えた対話の場をつくる。'],
    ['Kami terbuka untuk bertukar pengetahuan dan menjajaki peluang kolaborasi. Materi di bawah memisahkan referensi pada poster dari organisasi yang ingin dijajaki.', 'We welcome knowledge exchange and the exploration of collaboration opportunities. The materials below distinguish poster references from organizations for potential exploration.', '知識の交換や協働の可能性を探ることに前向きです。以下では、ポスター上の参考資料と、今後検討する組織を区別して掲載しています。'],
    ['Organisasi yang tercantum pada poster referensi', 'Organizations shown on reference posters', '参考ポスターに掲載されている組織'],
    ['Logo dan keterangan berikut ditampilkan sebagai referensi visual dari poster yang diberikan.', 'The following logos and descriptions are shown as visual references from the supplied poster.', '以下のロゴと説明は、提供されたポスターのビジュアル参考資料として掲載しています。'],
    ['REFERENSI PADA POSTER', 'SHOWN ON REFERENCE POSTER', '参考ポスターに掲載'],
    ['REFERENSI VISUAL', 'VISUAL REFERENCE', 'ビジュアル参考資料'],
    ['REFERENSI VISUAL • BELUM RESMI', 'VISUAL REFERENCE • UNOFFICIAL', 'ビジュアル参考資料 • 非公式'],
    ['PENJAJAKAN • BELUM RESMI', 'EXPLORATORY • UNOFFICIAL', '検討中 • 非公式'],
    ['Dicantumkan pada poster sebagai produsen tank dan kendaraan tempur.', 'Shown on the poster as a producer of tanks and combat vehicles.', 'ポスターでは戦車・戦闘車両メーカーとして掲載されています。'],
    ['Dicantumkan pada poster sebagai produsen pesawat terbang.', 'Shown on the poster as an aircraft manufacturer.', 'ポスターでは航空機メーカーとして掲載されています。'],
    ['Dicantumkan pada poster sebagai produsen kapal dan tanker.', 'Shown on the poster as a ship and tanker manufacturer.', 'ポスターでは船舶・タンカーのメーカーとして掲載されています。'],
    ['Logo Mitsubishi Motors ditampilkan pada gambar referensi. Penayangan ini bukan pernyataan kemitraan atau afiliasi resmi.', 'The Mitsubishi Motors logo is shown as a visual reference. Its appearance does not indicate an official partnership or affiliation.', '三菱自動車のロゴはビジュアル参考資料として掲載しています。公式な提携や関係を示すものではありません。'],
    ['Materi visual kampanye Prabowo–Gibran 2024', 'Prabowo–Gibran 2024 campaign visual', 'Prabowo–Gibran 2024のキャンペーンビジュアル'],
    ['Logo Universitas Esa Unggul', 'Esa Unggul University logo', 'エサ・ウングル大学のロゴ'],
    ['Logo Mitsubishi Motors pada gambar referensi', 'Mitsubishi Motors logo in the supplied reference image', '提供された参考画像の三菱自動車ロゴ'],
    ['Logo PT Pindad seperti ditampilkan pada poster referensi', 'PT Pindad logo as shown on the reference poster', '参考ポスターに掲載されたPT Pindadのロゴ'],
    ['Logo PT Dirgantara Indonesia seperti ditampilkan pada poster referensi', 'PT Dirgantara Indonesia logo as shown on the reference poster', '参考ポスターに掲載されたPT Dirgantara Indonesiaのロゴ'],
    ['Logo PT PAL Indonesia seperti ditampilkan pada poster referensi', 'PT PAL Indonesia logo as shown on the reference poster', '参考ポスターに掲載されたPT PAL Indonesiaのロゴ'],
    ['Logo PT Pindad, PT Dirgantara Indonesia, dan PT PAL pada bagian ini merupakan potongan dari poster referensi yang Anda berikan dan bukan aset resmi yang telah diverifikasi. Penayangannya bukan pernyataan afiliasi, kemitraan resmi, dukungan, atau endorsement. Label penjajakan juga tidak menyatakan adanya komunikasi atau kerja sama dengan organisasi terkait.', 'The PT Pindad, PT Dirgantara Indonesia, and PT PAL logos in this section are excerpts from the reference poster you provided and are not verified official assets. Their display does not indicate affiliation, an official partnership, support, or endorsement. An exploratory label also does not imply that communication or cooperation with the organization has taken place.', 'このセクションのPT Pindad、PT Dirgantara Indonesia、PT PALのロゴは、ご提供いただいた参考ポスターからの抜粋であり、公式素材として確認されたものではありません。掲載は提携、公式パートナーシップ、支持、推薦を示すものではありません。また、検討中という表示は、該当組織との連絡や協力が行われたことを意味しません。'],
    ['HUBUNGI KAMI', 'GET IN TOUCH', 'お問い合わせ'],
    ['Terbuka untuk pertanyaan dan pertukaran gagasan.', 'Open to questions and exchange of ideas.', 'ご質問やアイデアの交換を歓迎します。'],
    ['Hubungi Proyek Garuda untuk menyampaikan pertanyaan, masukan, atau topik diskusi seputar konsep teknologi.', 'Contact Proyek Garuda with questions, feedback, or discussion topics about technology concepts.', 'テクノロジーコンセプトに関するご質問、ご意見、話題についてはProyek Garudaまでお問い合わせください。'],
    ['Kirim pesan', 'Send a message', 'メッセージを送る'],
    ['Hubungi melalui WhatsApp', 'Contact us on WhatsApp', 'WhatsAppで問い合わせ'],
    ['PROFIL PROGRAM', 'PROGRAM PROFILE', 'プログラム概要'],
    ['Tentang Proyek Garuda', 'About Proyek Garuda', 'Proyek Garudaについて'],
    ['Platform eksplorasi konsep teknologi lintas bidang yang mengutamakan keterbukaan, keselamatan, dan manfaat bagi manusia.', 'A cross-disciplinary technology concept exploration platform that prioritizes openness, safety, and human benefit.', '透明性、安全性、人々への貢献を重視する、分野横断的な技術コンセプト探求プラットフォームです。'],
    ['SIAPA KAMI', 'WHO WE ARE', '私たちについて'],
    ['Ruang untuk gagasan teknologi yang bertanggung jawab.', 'A space for responsible technology ideas.', '責任ある技術アイデアのための場。'],
    ['Proyek Garuda adalah inisiatif independen untuk mengeksplorasi, mendokumentasikan, dan mengomunikasikan konsep teknologi. Portofolio ini merupakan materi konseptual dan edukatif, bukan representasi perusahaan berbadan hukum atau program resmi instansi.', 'Proyek Garuda is an independent initiative to explore, document, and communicate technology concepts. This portfolio is conceptual and educational material, not a representation of a legal entity or an official institutional program.', 'Proyek Garudaは、技術コンセプトを探求、記録、発信する独立した取り組みです。このポートフォリオは概念的・教育的な資料であり、法人や機関の公式プログラムを代表するものではありません。'],
    ['Terbuka', 'Open', 'オープン'],
    ['Menjelaskan gagasan, status, dan batasan dengan jujur.', 'Explaining ideas, status, and limitations honestly.', 'アイデア、状況、制限を誠実に説明します。'],
    ['Berorientasi manusia', 'People-centered', '人を中心に'],
    ['Mempertimbangkan kebutuhan, keselamatan, dan dampak.', 'Considering needs, safety, and impact.', 'ニーズ、安全性、影響を考慮します。'],
    ['Kolaboratif', 'Collaborative', '協働'],
    ['Mengundang dialog dan pertukaran perspektif.', 'Encouraging dialogue and an exchange of perspectives.', '対話と視点の交換を促します。'],
    ['VISI, MISI & NILAI', 'VISION, MISSION & VALUES', 'ビジョン・ミッション・価値観'],
    ['Arah yang memandu setiap eksplorasi.', 'Guiding every exploration.', '探求を導く指針。'],
    ['Menumbuhkan budaya eksplorasi teknologi yang bermanfaat.', 'Fostering a culture of beneficial technology exploration.', '有益な技術探求の文化を育てる。'],
    ['Mendorong pembelajaran dan dialog tentang gagasan teknologi lintas disiplin.', 'Encouraging learning and dialogue about cross-disciplinary technology ideas.', '分野横断的な技術アイデアについて、学びと対話を促進します。'],
    ['Menyajikan konsep dengan jelas, aman, dan bertanggung jawab.', 'Presenting concepts clearly, safely, and responsibly.', 'コンセプトを明確かつ安全に、責任を持って紹介する。'],
    ['Mendokumentasikan arah dan perkembangan gagasan serta membedakan konsep dari implementasi nyata.', 'Documenting the direction and development of ideas and distinguishing concepts from real-world implementation.', 'アイデアの方向性と進展を記録し、コンセプトと実際の導入を区別します。'],
    ['NILAI', 'VALUES', '価値観'],
    ['Integritas, keselamatan, keterbukaan, dan kolaborasi.', 'Integrity, safety, openness, and collaboration.', '誠実さ、安全性、透明性、協働。'],
    ['Prinsip-prinsip ini menjadi dasar komunikasi dan pengembangan portofolio.', 'These principles guide communication and portfolio development.', 'これらの原則は、コミュニケーションとポートフォリオ開発の基盤です。'],
    ['KONTAK', 'CONTACT', 'お問い合わせ'],
    ['Terbuka untuk percakapan.', 'Open to conversation.', '対話を歓迎します。'],
    ['Hubungi kami untuk pertanyaan, masukan, atau diskusi seputar konsep.', 'Contact us with questions, feedback, or discussions about our concepts.', 'コンセプトに関するご質問、ご意見、話し合いについてお問い合わせください。'],
    ['CATATAN ASET', 'ASSET RECORD', '資産記録'],
    ['Deal selesai.', 'Deal complete.', '取引完了。'],
    ['aset Done Deal atas nama', 'completed deals under the name of', '件の取引が完了しました。名義人：'],
    ['Chat ke WhatsApp', 'Message us on WhatsApp', 'WhatsAppでチャット'],
    ['Daftar kendaraan done deal', 'Completed vehicle deals', '取引完了車両一覧'],
    ['Tampak luar', 'Exterior view', '外観'],
    ['Perbesar tampak luar', 'Enlarge exterior view', '外観を拡大'],
    ['Visual konsep gedung - bukan foto lokasi aktual', 'Building concept visual — not a photo of the actual location', '建物のコンセプト画像 — 実際の場所の写真ではありません'],
    ['Denah interior luas', 'Spacious interior floor plan', '広々とした室内間取り図'],
    ['Perbesar denah interior', 'Enlarge interior floor plan', '室内間取り図を拡大'],
    ['Tampak luar', 'Exterior view', '外観'],
    ['Foto', 'Photo', '写真'],
    ['Tanggal Done Deal', 'Deal completion date', '取引完了日'],
    ['Atas nama', 'Registered to', '名義人'],
    ['Lokasi rencana', 'Planned location', '予定地'],
    ['Plat nomor', 'License plate', 'ナンバープレート'],
    ['Chat untuk informasi', 'Chat for information', 'チャットで問い合わせ'],
    ['GALERI DONE DEAL', 'COMPLETED DEAL GALLERY', '取引完了ギャラリー'],
    ['Kontrol pembesaran gambar', 'Image zoom controls', '画像の拡大操作'],
    ['Perkecil gambar', 'Zoom out', '縮小'],
    ['Perbesar gambar', 'Zoom in', '拡大'],
    ['Tutup gambar', 'Close image', '画像を閉じる'],
    ['Tutup', 'Close', '閉じる'],
    ['Gunakan tombol + dan − atau keyboard untuk zoom. Tekan Esc untuk menutup.', 'Use the + and − buttons or your keyboard to zoom. Press Esc to close.', '+ / −ボタンまたはキーボードで拡大・縮小できます。Escキーで閉じます。'],
    ['KONTAK PROGRAM', 'PROGRAM CONTACT', 'プログラム連絡先'],
    ['Hubungi Proyek Garuda', 'Contact Proyek Garuda', 'Proyek Garudaに問い合わせ'],
    ['Ada pertanyaan, saran, atau ingin berdiskusi? Hubungi kontak program atau kirim pesan melalui formulir.', 'Have a question, suggestion, or want to talk? Contact the program team or send a message using the form.', 'ご質問、ご提案、またはご相談がありますか？プログラム窓口に連絡するか、フォームからメッセージをお送りください。'],
    ['Terhubung langsung.', 'Get in touch directly.', '直接お問い合わせいただけます。'],
    ['Untuk pertanyaan dan diskusi mengenai Proyek Garuda, silakan hubungi:', 'For questions and discussions about Proyek Garuda, please contact:', 'Proyek Garudaに関するご質問・ご相談は、こちらまでご連絡ください：'],
    ['Nama', 'Name', '氏名'],
    ['WhatsApp', 'WhatsApp', 'WhatsApp'],
    ['Email', 'Email', 'メール'],
    ['Kirim pesan', 'Send a message', 'メッセージを送る'],
    ['Pesan berhasil disimpan. Terima kasih.', 'Your message has been received. Thank you.', 'メッセージを受け付けました。ありがとうございます。'],
    ['Nomor WhatsApp', 'WhatsApp number', 'WhatsApp番号'],
    ['Nomor WhatsApp (opsional)', 'WhatsApp number (optional)', 'WhatsApp番号（任意）'],
    ['Alamat email (opsional)', 'Email address (optional)', 'メールアドレス（任意）'],
    ['Subjek', 'Subject', '件名'],
    ['Subjek pesan (opsional)', 'Message subject (optional)', '件名（任意）'],
    ['Pesan', 'Message', 'メッセージ'],
    ['Tulis pesan Anda', 'Write your message', 'メッセージを入力してください'],
    ['Kirim Pesan', 'Send Message', 'メッセージを送信'],
    ['Diskusi Konsep', 'Discuss the Concept', 'コンセプトについて話し合う'],
    ['Informasi Konsep', 'Concept Information', 'コンセプト情報'],
    ['Materi ini ditampilkan sebagai eksplorasi desain, pendidikan, dan R&D konseptual. Bukan spesifikasi operasional atau pengumuman proyek resmi.', 'This material is presented for design exploration, education, and conceptual R&D. It is not an operational specification or an announcement of an official project.', '本資料はデザインの探求、教育、概念的な研究開発を目的としています。運用仕様や公式プロジェクトの発表ではありません。'],
    ['Progres dokumentasi', 'Documentation progress', '記録の進捗'],
    ['Terakhir diperbarui', 'Last updated', '最終更新'],
    ['Halaman yang Anda cari tidak ditemukan.', 'The page you are looking for could not be found.', 'お探しのページが見つかりません。'],
    ['Kembali', 'Go back', '戻る'],
    ['Login Admin', 'Admin Login', '管理者ログイン'],
    ['Kelola konten Proyek Garuda.', 'Manage Proyek Garuda content.', 'Proyek Garudaのコンテンツを管理します。'],
    ['Masuk', 'Log in', 'ログイン'],
    ['Dashboard Admin', 'Admin Dashboard', '管理者ダッシュボード'],
    ['Dashboard Informasi Proyek', 'Project Information Dashboard', 'プロジェクト情報ダッシュボード'],
    ['Login sebagai', 'Logged in as', 'ログイン中：'],
    ['Logout', 'Log out', 'ログアウト'],
    ['Kelola Proyek', 'Manage Projects', 'プロジェクト管理'],
    ['Progres (%)', 'Progress (%)', '進捗（%）'],
    ['Simpan Perubahan', 'Save Changes', '変更を保存'],
    ['Pesan Masuk', 'Messages', '受信メッセージ'],
    ['Kontak', 'Contact', '連絡先'],
    ['Waktu', 'Time', '日時'],
    ['Portal informasi & eksplorasi teknologi Indonesia. Seluruh visual merupakan konsep R&D/edukasi, bukan pengumuman program resmi instansi atau kerja sama resmi.', 'An Indonesian portal for information and technology exploration. All visuals are R&D/educational concepts, not announcements of official institutional programs or partnerships.', 'インドネシアの情報・技術探求ポータルです。すべてのビジュアルは研究開発・教育用のコンセプトであり、機関の公式計画や正式な提携の発表ではありません。'],
    ['Chat WhatsApp:', 'WhatsApp chat:', 'WhatsAppチャット：'],
    ['Nama Anda', 'Your name', 'お名前'],
    ['Username', 'Username', 'ユーザー名'],
    ['Password', 'Password', 'パスワード'],
    ['GALERI PORTOFOLIO', 'PORTFOLIO GALLERY', 'ポートフォリオギャラリー'],
    ['Tahap eksplorasi:', 'Exploration stage:', '探求段階：'],
    ['Baca ringkasan konsep', 'Read concept overview', 'コンセプト概要を読む'],
    ['Perbesar gambar', 'Enlarge image', '画像を拡大'],
    ['Gunakan tombol + dan − untuk memperbesar atau memperkecil gambar. Tekan Esc untuk menutup.', 'Use the + and − buttons to zoom in or out. Press Esc to close.', '+ / −ボタンで拡大・縮小できます。Escキーで閉じます。'],
  ];

  const catalog = Object.fromEntries(messages.map(([id, en, ja]) => [
    id,
    { en, ja }
  ]));
  const prefixes = [
    ['Pesawat Futuristik — Seri ', 'Futuristic Aircraft — Series ', '未来型航空機 — シリーズ'],
    ['Helikopter Futuristik — Seri ', 'Futuristic Helicopters — Series ', '未来型ヘリコプター — シリーズ'],
    ['Kendaraan Darat Futuristik — Seri ', 'Futuristic Land Vehicles — Series ', '未来型陸上車両 — シリーズ'],
    ['Perbesar poster ', 'Enlarge poster ', 'ポスターを拡大：'],
    ['Perbesar gambar ', 'Enlarge image ', '画像を拡大：'],
    ['Perbesar konsep ', 'Enlarge concept ', 'コンセプトを拡大：'],
    ['Tahap eksplorasi: ', 'Exploration stage: ', '探求段階：'],
    ['Progres konsep ', 'Concept progress ', 'コンセプトの進捗'],
    [' persen', ' percent', 'パーセント']
  ];
  const textSources = new WeakMap();
  const attributeSources = new WeakMap();
  const translatableAttributes = ['alt', 'aria-label', 'title', 'placeholder', 'data-lightbox-title'];
  const languageButtons = document.querySelectorAll('[data-language]');

  const getCookieLanguage = () => {
    const cookie = document.cookie.split('; ').find(value => value.startsWith('garuda-language='));
    const value = cookie ? cookie.slice('garuda-language='.length) : 'id';
    return ['id', 'en', 'ja'].includes(value) ? value : 'id';
  };

  let language = getCookieLanguage();

  const translate = source => {
    if (language === 'id') return source;
    if (catalog[source]) return catalog[source][language] || source;
    for (const [idPrefix, enPrefix, jaPrefix] of prefixes) {
      if (source.startsWith(idPrefix)) {
        return `${language === 'en' ? enPrefix : jaPrefix}${source.slice(idPrefix.length)}`;
      }
    }
    return source;
  };

  const translateTextNode = node => {
    const source = textSources.has(node) ? textSources.get(node) : node.nodeValue;
    if (!textSources.has(node)) textSources.set(node, source);
    const match = source.match(/^(\s*)([\s\S]*?)(\s*)$/);
    node.nodeValue = `${match[1]}${translate(match[2])}${match[3]}`;
  };

  const translateElement = element => {
    if (element.nodeType !== Node.ELEMENT_NODE) return;
    if (element.matches('script,style,[data-i18n-ignore]')) return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (!walker.currentNode.parentElement.closest('script,style,[data-i18n-ignore]')) {
        translateTextNode(walker.currentNode);
      }
    }
    for (const current of [element, ...element.querySelectorAll('*')]) {
      if (current.matches('script,style,[data-i18n-ignore]') || current.closest('[data-i18n-ignore]')) continue;
      for (const attribute of translatableAttributes) {
        if (!current.hasAttribute(attribute)) continue;
        let sources = attributeSources.get(current);
        if (!sources) {
          sources = new Map();
          attributeSources.set(current, sources);
        }
        if (!sources.has(attribute)) sources.set(attribute, current.getAttribute(attribute));
        const source = sources.get(attribute);
        const value = translate(source);
        if (current.getAttribute(attribute) !== value) current.setAttribute(attribute, value);
      }
    }
  };

  const applyLanguage = value => {
    language = ['id', 'en', 'ja'].includes(value) ? value : 'id';
    document.documentElement.lang = language;
    for (const button of languageButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    }
    document.cookie = `garuda-language=${language}; Path=/; Max-Age=31536000; SameSite=Lax`;
    translateElement(document.body);
  };

  languageButtons.forEach(button => {
    button.addEventListener('click', () => applyLanguage(button.dataset.language));
  });
  applyLanguage(language);

  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes') {
        translateElement(record.target);
        continue;
      }
      for (const node of record.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) translateElement(node);
        else if (node.nodeType === Node.TEXT_NODE && node.parentElement) translateTextNode(node);
      }
    }
  }).observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: translatableAttributes
  });
})();
