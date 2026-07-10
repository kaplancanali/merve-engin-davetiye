export const wedding = {
  bride: 'Merve',
  groom: 'Engin',
  intro: 'Mutluluğumuzu birlikte paylaşmak dileğiyle...',
  families: { bride: 'OKAN Ailesi', groom: 'GÜVEN Ailesi' },
  event: 'DÜĞÜN',
  date: '08 Ağustos 2026 Cumartesi',
  time: '19.00',
  venue: 'ANKARA ŞEKER FABRİKASI SOSYAL TESİSLERİ - ALAKART RESTAURANT',
  address: 'Ayaş Yolu 18. km Etimesgut / ANKARA',
  weddingDateISO: '2026-08-08T19:00:00+03:00',
  map: {
    query: 'Ankara Şeker Fabrikası Sosyal Tesisleri Alakart Restaurant Etimesgut',
    label: 'Ankara Şeker Fabrikası Sosyal Tesisleri - Alakart Restaurant',
    city: 'Etimesgut / Ankara',
  },
  schedule: [
    {
      time: '19:00',
      title: 'Misafir Karşılama',
      description:
        'Salon girişinde karşılama. Misafirlerimizi ağırlıyor, yerlerine yönlendiriyoruz. Hoş geldin ikramları servis edilir.',
      location: 'Salon Girişi',
    },
    {
      time: '20:00',
      title: 'Nikah Töreni',
      description:
        'Resmi nikah töreni gerçekleştirilir. Nikah şahitleri ve yakın ailemiz törene katılır. Yüzük takma ve imza töreni.',
      location: 'Nikah Masası',
    },
    {
      time: '20:30',
      title: 'İkram Dağıtımı',
      description:
        'Sıcak ve soğuk ikramların dağıtımı başlar. Açık büfe servisi ile yemek ikramı yapılır.',
      location: 'Ana Salon',
    },
    {
      time: '21:00',
      title: 'Gelin ve Damadın Masaları Ziyareti',
      description:
        'Gelin ve damat tüm misafir masalarını tek tek ziyaret eder. Fotoğraf çekimleri ve sohbetler gerçekleşir.',
      location: 'Tüm Masalar',
    },
    {
      time: '22:00',
      title: 'Pasta Kesimi',
      description:
        'Düğün pastasının kesimi ve kutlama anı. Pasta servisi misafirlerimize ikram edilir.',
      location: 'Ana Salon',
    },
    {
      time: '23:00',
      title: 'Kapanış ve Uğurlama',
      description:
        'Gece sona erer. Katılımınız ve güzel dilekleriniz için teşekkür ederiz. Misafirlerimizi uğurluyoruz.',
      location: 'Salon Çıkışı',
    },
  ],
} as const
