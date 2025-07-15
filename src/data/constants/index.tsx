import { ArrowDownIcon, Github } from 'lucide-react';

export const heroSection = {
  headline: {
    title: 'Cek Harga Barang',
    highlight: 'Waroeng',
    desc: ' Temukan daftar harga terbaru sayuran, sembako, dan barang kebutuhan lainnya.',
  },
  buttons: [
    {
      icon: <ArrowDownIcon />,
      label: 'Lihat Daftar Harga',
      link: '#products',
      variant: 'default',
      positionIcon: 'right',
    },
    {
      icon: <Github />,
      label: 'Repository',
      link: 'https://github.com/fjrfthrrhmn/waroeng.next',
      variant: 'outline',
      positionIcon: 'left',
    },
  ],
  tech: [{}],
};

export const summarySection = {
  paragraph:
    "Website sederhana untuk cek harga barang. Alasan dibangun untuk mempermudah mengetahui harga barang yang ada di 'Waroeng' Mamake.",
};
