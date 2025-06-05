import lesson1 from '../../assets/profile/timeline/lesson1.svg';
import lesson2 from '../../assets/profile/timeline/lesson2.svg';
import lesson3 from '../../assets/profile/timeline/lesson3.svg';
import lesson4 from '../../assets/profile/timeline/lesson4.svg';
import lesson5 from '../../assets/profile/timeline/lesson5.svg';
import lesson6 from '../../assets/profile/timeline/lesson6.svg';

import bbcnewsLogo from '../../assets/profile/news/bbcnewsLogo.svg';
import cnnLogo from '../../assets/profile/news/cnnLogo.svg';
import euronewsLogo from '../../assets/profile/news/euronewsLogo.svg';
import nbcLogo from '../../assets/profile/news/nbcLogo.svg';

import AlishaSwan from '../../assets/profile/AlishaSwan.png';
import JamesWood from '../../assets/profile/JamesWood.png';
import LuisSuares from '../../assets/profile/LuisSuares.png';
import SamanthaBird from '../../assets/profile/SamanthaBird.png';
import TaraSmith from '../../assets/profile/TaraSmith.png';
import BrandyMartins from '../../assets/profile/BrandyMartins.png';
import EnzoMacaroni from '../../assets/profile/EnzoMacaroni.png';
import JennyLim from '../../assets/profile/JennyLim.png';

export default {
  timelineWidget: {
    timelineData: [
      {
        img: lesson1,
        title: "Lesson 1",
        label: "Self introduction"
      },
      {
        img: lesson2,
        title: "Lesson 2",
        label: "Dialog at school"
      },
      {
        img: lesson3,
        title: "Lesson 3",
        label: "Daily conversation"
      },
      {
        img: lesson4,
        title: "Lesson 4",
        label: "Listening"
      },
      {
        img: lesson5,
        title: "Quiz",
        label: "First week quiz"
      },
      {
        img: lesson6,
        title: "Assignment",
        label: "First week assignment"
      },
    ],
    timelineSteps: [
      {
        cardSubtitle: "",
        cardDetailedText: "",
      },
      {
        cardTitle: "",
        cardSubtitle: "",
        cardDetailedText: "",
      },
      {
        cardTitle: "",
        cardSubtitle: "",
        cardDetailedText: "",
      },
      {
        cardTitle: "",
        cardSubtitle: "",
        cardDetailedText: "",
      },
      {
        cardTitle: "",
        cardSubtitle: "",
        cardDetailedText: "",
      },
      {
        cardTitle: "",
        cardSubtitle: "",
        cardDetailedText: "",
      },
    ],
  },
  newsGroupData: [
    {
      title:"BBC News",
      time:"15 min ago",
      img: bbcnewsLogo,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys typesetting industry.',
    },
    {
      title:"Euronews",
      time:"1 h ago",
      img: cnnLogo,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys typesetting industry.',
    },
    {
      title:"CNN",
      time:"3 h ago",
      img: euronewsLogo,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys typesetting industry.',
    },
    {
      title:"NBC",
      time:"6 h ago",
      img: nbcLogo,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys typesetting industry.',
    },
  ],

  avatarGroupData: [
    {
      title: 'Alisha Swan',
      img: AlishaSwan,
    },
    {
      title: 'James Wood',
      img: JamesWood,
    },
    {
      title: 'Luis Suares',
      img: LuisSuares,
    },
    {
      title: 'Samantha Bird',
      img: SamanthaBird,
    },
    {
      title: 'Tara Smith',
      img: TaraSmith,
    },
    {
      title: 'Brandy Martins',
      img: BrandyMartins,
    },
    {
      title: 'Enzo Macaroni',
      img: EnzoMacaroni,
    },
    {
      title: 'Jenny Lim',
      img: JennyLim,
    },
  ],
  apexLineChart: {
    series: [
      {
        name: "Products",
        data: [30, 41, 35, 51, 49, 62, 69, 91, 100]
      },
      {
        name: "Services",
        data: [64, 53, 47, 39, 24, 36, 42, 55, 67]
      }
    ],
    options: {
      chart: {
        toolbar: false,
        zoom: {
          enabled: false
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      grid: {
        show: false,
        row: {
          colors: ['transparent'],
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        labels: {
          style: {
            colors: "#6B859E",
          },
        },
      },
      yaxis: {
        tickAmount: 3,
        labels: {
          style: {
            colors: "#6B859E",
          },
        },
      },
      colors: ['#4d53e0', '#41D5E2']
    }
  }
}
