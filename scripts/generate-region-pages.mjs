import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = "https://ptvisitcare.kr";

const regions = [
  {
    slug: "songtan",
    name: "송탄",
    title: "송탄출장마사지 | 송탄역·서정동·신장동 방문 케어",
    description: "송탄출장마사지 방문 안내. 송탄역, 서정동, 신장동, 이충동 생활권의 코스와 가격, 숙소·주거지 방문 조건과 예약 방법을 안내합니다.",
    lead: "송탄역·서정리역과 서정동·신장동·이충동의 자택, 오피스텔과 숙박시설로 방문합니다. 역세권 교통과 골목 주차, 심야 출입 조건을 확인한 뒤 가능한 시간과 코스를 안내합니다.",
    summary: "송탄역·서정동·신장동",
    quote: "“서정동 오피스텔 / 오늘 오후 10시 / 아로마 90분 문의합니다.”",
    timing: "송탄역과 서정리역 주변은 시간대에 따라 차량 흐름이 달라질 수 있습니다.",
    localGuide: [
      "송탄역·신장동의 숙박시설과 서정동·이충동의 아파트는 확인해야 할 출입 정보가 서로 다릅니다. 숙소라면 정확한 지점명과 로비 호출 방법을, 공동주택이라면 방문 차량 등록과 공동현관 호출 방법을 알려주세요.",
      "골목 주거지나 상권 인근은 건물 이름만으로 입구를 찾기 어려울 수 있습니다. 가까운 도로명이나 눈에 띄는 건물, 주차 가능한 위치를 함께 전달하면 배정 동선을 더 정확하게 확인할 수 있습니다."
    ],
    localFaq: {
      question: "송탄역 숙소와 서정동 아파트는 예약할 때 무엇이 다른가요?",
      answer: "송탄역 인근 숙소는 정확한 지점명과 외부인 출입 방법을, 서정동 아파트는 단지명과 방문 차량 등록 여부를 우선 확인합니다. 현재 위치에 맞는 정보를 문자로 보내주시면 됩니다."
    },
    areas: [
      {
        name: "송탄역·지산동",
        text: "송탄역 주변 숙박시설과 지산동 주거지를 확인합니다. 역세권은 숙소 지점명과 객실 출입 방법을 함께 알려주면 이동 위치를 정확히 확인할 수 있습니다.",
        tags: "역세권 · 숙박시설 · 주거지"
      },
      {
        name: "서정동·서정리역",
        text: "서정리역 생활권의 아파트와 오피스텔, 주택으로 방문합니다. 공동현관 호출이나 방문 차량 등록이 필요한 단지는 예약할 때 방법을 알려주세요.",
        tags: "아파트 · 오피스텔 · 역세권"
      },
      {
        name: "신장동·중앙시장 인근",
        text: "신장동 주거지와 상권 주변 숙소를 확인합니다. 골목 폭과 주차 조건, 늦은 시간 출입 제한이 있는 건물은 가능한 진입 방법을 먼저 공유해 주세요.",
        tags: "상권 · 골목 주거지 · 숙소"
      },
      {
        name: "이충동·장당동",
        text: "이충동과 장당동의 대단지 아파트와 생활권 숙소로 이동합니다. 정확한 동과 단지명, 방문 차량 등록 여부를 알려주면 배정 동선을 확인합니다.",
        tags: "대단지 · 생활권 · 장기 숙소"
      }
    ]
  },
  {
    slug: "sosabeol",
    name: "소사벌",
    title: "소사벌출장마사지 | 비전동·동삭동·용이동 방문 케어",
    description: "소사벌출장마사지 방문 안내. 비전동, 소사벌 상업지구, 동삭동, 용이동의 코스와 가격, 아파트·오피스텔 예약 방법을 안내합니다.",
    lead: "비전동과 소사벌 상업지구, 동삭동·용이동의 아파트와 오피스텔, 숙박시설로 방문합니다. 대단지 차량 등록과 상업지구 주차 조건을 확인해 가능한 시간을 안내합니다.",
    summary: "비전동·동삭동·용이동",
    quote: "“비전동 아파트 / 오늘 오후 9시 / 타이 90분 문의합니다.”",
    timing: "소사벌 상업지구는 저녁 시간 주차와 차량 흐름을 함께 확인합니다.",
    localGuide: [
      "소사벌 상업지구의 오피스텔과 비전동·동삭동의 대단지 아파트는 주차장 입구와 방문 등록 방식이 다를 수 있습니다. 같은 건물에 상가와 주거 출입구가 나뉘는 경우 이용할 입구를 먼저 알려주세요.",
      "용이동·죽백동처럼 생활권 경계에 가까운 위치는 동 이름만 전달하는 것보다 정확한 주소나 가까운 단지명을 함께 보내는 편이 좋습니다. 희망시간과 출입 정보를 한 번에 전달하면 가능 여부를 빠르게 확인할 수 있습니다."
    ],
    localFaq: {
      question: "소사벌 상업지구 오피스텔은 주차 정보를 꼭 알려야 하나요?",
      answer: "상가 주차장과 주거 전용 주차장이 구분된 건물이 있어 입구와 방문 등록 방법을 미리 확인하는 것이 좋습니다. 등록이 필요하지 않다면 그 점도 함께 알려주세요."
    },
    areas: [
      {
        name: "비전동·소사벌 상업지구",
        text: "소사벌 상업지구 주변 오피스텔과 비전동 주거지를 확인합니다. 상가 주차장 또는 오피스텔 전용 출입구 위치를 예약할 때 알려주세요.",
        tags: "상업지구 · 오피스텔 · 주거지"
      },
      {
        name: "동삭동",
        text: "동삭동 대단지 아파트 생활권으로 방문합니다. 단지 동·호수와 공동현관 호출, 방문 차량 사전 등록 방식이 있으면 함께 전달해 주세요.",
        tags: "대단지 · 아파트 · 신축 생활권"
      },
      {
        name: "용이동·현촌지구",
        text: "용이동과 현촌지구의 아파트, 주택과 숙박시설을 확인합니다. 안성 방면 경계 지역은 정확한 위치를 기준으로 이동 가능 여부를 안내합니다.",
        tags: "아파트 · 주택 · 경계 생활권"
      },
      {
        name: "죽백동·배다리 인근",
        text: "죽백동과 배다리공원 인근 주거지는 단지 출입 조건과 주차 위치를 확인합니다. 가까운 건물명이나 단지명을 알려주면 동선을 빠르게 살펴봅니다.",
        tags: "주거지 · 공원 생활권 · 아파트"
      }
    ]
  },
  {
    slug: "pyeongtaek-station",
    name: "평택역",
    title: "평택역출장마사지 | 평택동·통복동·합정동 방문 케어",
    description: "평택역출장마사지 방문 안내. 평택동, 통복동, 합정동, 원평동의 호텔·숙소와 주거지 방문 범위, 코스와 예약 방법을 안내합니다.",
    lead: "평택역을 중심으로 평택동·통복동·합정동·원평동의 호텔과 숙박시설, 주거지로 방문합니다. 역세권 혼잡과 숙소 출입 규정을 확인해 예상 방문시간을 안내합니다.",
    summary: "평택동·통복동·합정동",
    quote: "“평택역 인근 호텔 / 오늘 오후 11시 / 아로마 90분 문의합니다.”",
    timing: "평택역 주변은 숙소명과 지점, 희망 시작시간을 함께 알려주세요.",
    localGuide: [
      "평택역 주변에는 비슷한 이름의 숙소가 있을 수 있으므로 상호만 보내기보다 정확한 지점명이나 도로명을 함께 알려주세요. 로비에서 객실 호출이 필요한지, 외부인 출입이 가능한지도 예약 전에 확인합니다.",
      "통복동·합정동의 시장과 상권 주변은 골목 진입과 주차 위치에 따라 접근 경로가 달라질 수 있습니다. 차량이 들어갈 수 있는 입구나 가까운 건물을 알려주면 불필요한 대기 시간을 줄이는 데 도움이 됩니다."
    ],
    localFaq: {
      question: "평택역 인근 호텔은 숙소 이름만 보내면 되나요?",
      answer: "같은 이름이나 비슷한 이름의 숙소가 있을 수 있어 정확한 지점명, 도로명 또는 지도에서 확인되는 주소를 함께 보내주세요. 외부인 출입 규정도 예약 전에 확인해야 합니다."
    },
    areas: [
      {
        name: "평택역·평택동",
        text: "평택역 앞 호텔과 숙박시설, 평택동 주거지를 확인합니다. 같은 이름의 숙소가 있을 수 있어 정확한 지점명과 입구 위치를 전달해 주세요.",
        tags: "호텔 · 역세권 · 숙박시설"
      },
      {
        name: "통복동",
        text: "통복시장과 평택역 사이의 주거지와 숙소로 이동합니다. 시장 주변은 시간대별 차량 진입과 주차 조건이 달라 가까운 건물명을 함께 알려주세요.",
        tags: "시장 생활권 · 주거지 · 숙소"
      },
      {
        name: "합정동",
        text: "합정동 아파트와 주택, 상권 주변 숙박시설을 확인합니다. 공동현관 호출과 골목 주차 방식이 있으면 예약할 때 미리 공유해 주세요.",
        tags: "아파트 · 주택 · 상권"
      },
      {
        name: "원평동·군문동",
        text: "원평동과 군문동의 주택, 아파트 생활권은 평택역 남쪽 이동 동선을 기준으로 확인합니다. 정확한 주소와 주차 가능 여부를 알려주세요.",
        tags: "주택 · 아파트 · 역 남부 생활권"
      }
    ]
  },
  {
    slug: "anjung",
    name: "안중",
    title: "안중출장마사지 | 현화리·송담지구·학현리 방문 케어",
    description: "안중출장마사지 방문 안내. 안중읍 현화리, 송담지구, 학현리의 아파트·숙소 방문 범위, 코스와 가격, 예약 방법을 안내합니다.",
    lead: "안중읍 현화리·송담지구·학현리와 주변 주거지의 아파트, 오피스텔과 숙소로 방문합니다. 평택 중심권과 이동거리가 있어 희망시간을 여유 있게 확인합니다.",
    summary: "현화리·송담지구·학현리",
    quote: "“안중읍 현화리 아파트 / 오늘 오후 9시 / 타이 90분 문의합니다.”",
    timing: "안중은 평택 중심권보다 이동시간이 길 수 있어 여유 있게 문의해 주세요.",
    localGuide: [
      "현화리·송담지구의 아파트는 단지명과 차량 등록 정보를 중심으로 확인하고, 학현리·금곡리 같은 외곽 생활권은 정확한 주소와 진입로 정보를 함께 확인합니다. 같은 안중읍 안에서도 위치 조건에 따라 안내가 달라질 수 있습니다.",
      "희망 시작시간이 정해져 있다면 가능한 한 여유 있게 문의해 주세요. 배정 가능 여부와 이동 조건을 먼저 확인한 뒤 예상 방문시간과 추가 이동 비용 여부를 예약 확정 전에 안내합니다."
    ],
    localFaq: {
      question: "안중 외곽 지역은 추가 비용이 바로 발생하나요?",
      answer: "지역명만으로 추가 비용을 정하지 않고 정확한 위치와 이동 조건을 확인합니다. 추가 비용이 필요한 경우에는 예약을 확정하기 전에 먼저 안내합니다."
    },
    areas: [
      {
        name: "현화리·현화지구",
        text: "현화리 아파트와 상권 주변 주거지, 숙박시설을 확인합니다. 대단지는 방문 차량 등록과 공동현관 호출 방법을 함께 알려주세요.",
        tags: "아파트 · 상권 · 생활 중심지"
      },
      {
        name: "송담지구",
        text: "송담지구의 신축 아파트와 오피스텔 생활권으로 방문합니다. 단지명과 동·호수, 주차 등록 여부를 예약할 때 전달해 주세요.",
        tags: "신축 주거지 · 아파트 · 오피스텔"
      },
      {
        name: "학현리",
        text: "학현리 주거지와 산업시설 인근 숙소를 확인합니다. 도로 진입 위치가 나뉘는 곳은 가까운 건물명이나 정확한 주소를 알려주세요.",
        tags: "주거지 · 산업시설 인근 · 숙소"
      },
      {
        name: "금곡리·덕우리",
        text: "안중 외곽 생활권은 현재 위치와 이동 조건을 기준으로 방문 가능 여부를 확인합니다. 주차 공간과 진입로 정보를 미리 공유해 주세요.",
        tags: "외곽 주거지 · 주택 · 사업장 인근"
      }
    ]
  },
  {
    slug: "poseung",
    name: "포승",
    title: "포승출장마사지 | 평택항·도곡리·만호리 방문 케어",
    description: "포승출장마사지 방문 안내. 포승읍 도곡리, 만호리, 평택항과 산업단지 인근 숙소의 코스와 가격, 예약·방문 방법을 안내합니다.",
    lead: "포승읍 도곡리·만호리·원정리와 평택항, 포승산업단지 인근의 숙소와 주거지로 방문합니다. 이동거리가 긴 지역은 현재 위치와 희망시간을 먼저 확인합니다.",
    summary: "평택항·도곡리·만호리",
    quote: "“포승읍 도곡리 숙소 / 오늘 오후 10시 / 아로마 90분 문의합니다.”",
    timing: "포승과 평택항 인근은 정확한 숙소명과 산업단지 위치를 먼저 확인합니다.",
    localGuide: [
      "포승읍은 도곡리 주거지와 평택항·산업단지 인근 숙소의 위치 조건이 크게 다를 수 있습니다. 사업장 이름만 보내기보다 실제 이용할 숙소 주소나 가까운 도로명을 전달해 주세요.",
      "교대 전후 시간에는 희망시간과 현재 위치를 함께 확인해야 합니다. 장기 숙소는 외부인 출입 여부와 주차 가능한 위치를 먼저 확인하고, 이동 가능 여부와 예상 방문시간을 안내합니다."
    ],
    localFaq: {
      question: "평택항이나 산업단지 근무지는 회사 이름만 보내도 되나요?",
      answer: "회사와 실제 숙소가 떨어져 있을 수 있어 이용할 장소의 정확한 주소가 필요합니다. 가까운 건물명, 숙소명과 주차 가능 위치도 함께 보내주세요."
    },
    areas: [
      {
        name: "도곡리·포승 생활권",
        text: "도곡리의 아파트와 원룸, 상권 주변 숙박시설을 확인합니다. 같은 도로에 숙소가 여러 곳이면 정확한 지점명과 입구 위치를 알려주세요.",
        tags: "아파트 · 원룸 · 숙박시설"
      },
      {
        name: "만호리·평택항",
        text: "평택항과 만호리의 장기 숙소, 주거지로 방문합니다. 항만 주변은 사업장 출입구와 숙소 위치가 떨어질 수 있어 현재 위치를 정확히 전달해 주세요.",
        tags: "평택항 · 장기 숙소 · 사업장 인근"
      },
      {
        name: "원정리·산업단지",
        text: "원정리와 포승산업단지 인근 숙소를 확인합니다. 교대 시간에는 차량 흐름과 배정 상황이 달라 희망 시작시간을 여유 있게 문의해 주세요.",
        tags: "산업단지 · 교대 생활권 · 숙소"
      },
      {
        name: "석정리·홍원리",
        text: "포승 외곽의 주택과 사업장 인근 숙소는 이동거리와 진입 조건을 기준으로 가능 여부를 안내합니다. 주차 공간도 함께 알려주세요.",
        tags: "외곽 주거지 · 주택 · 사업장"
      }
    ]
  },
  {
    slug: "paengseong",
    name: "팽성",
    title: "팽성출장마사지 | 안정리·객사리·송화리 방문 케어",
    description: "팽성출장마사지 방문 안내. 안정리, 객사리, 송화리, 내리의 주택·아파트·장기 숙소 방문 범위와 코스, 예약 방법을 안내합니다.",
    lead: "팽성읍 안정리·객사리·송화리·내리의 주택과 아파트, 장기 체류 숙소로 방문합니다. 보안 게이트와 외부인 확인 절차가 있는 장소는 출입 방법을 먼저 확인합니다.",
    summary: "안정리·객사리·송화리",
    quote: "“팽성읍 안정리 장기 숙소 / 오늘 오후 9시 / 타이 90분 문의합니다.”",
    timing: "팽성은 숙소와 주거지별 보안·외부인 출입 조건을 먼저 확인해 주세요.",
    localGuide: [
      "안정리 장기 숙소와 객사리 아파트는 보안 게이트, 로비 호출과 방문 차량 등록 방식이 서로 다를 수 있습니다. 예약 전에 외부인 출입이 가능한지 확인하고 이용 가능한 출입 방법을 알려주세요.",
      "송화리·내리 등 주택과 외곽 생활권은 골목 진입과 주차 공간을 함께 확인합니다. 정확한 주소와 가까운 건물명을 보내주면 현재 배정 위치를 기준으로 방문 가능 여부를 살펴봅니다."
    ],
    localFaq: {
      question: "팽성 장기 숙소에 보안 게이트가 있으면 예약이 어려운가요?",
      answer: "외부인 출입이 허용되고 정상적인 방문 확인 절차를 이용할 수 있다면 위치를 확인할 수 있습니다. 우회 출입이나 규정을 벗어난 요청은 진행하지 않습니다."
    },
    areas: [
      {
        name: "안정리",
        text: "안정리 상권 주변 장기 숙소와 주택, 아파트를 확인합니다. 외부인 확인이나 보안 게이트가 있는 숙소는 가능한 출입 방법을 알려주세요.",
        tags: "장기 숙소 · 상권 · 주택"
      },
      {
        name: "객사리",
        text: "팽성읍 행정 중심지 주변 아파트와 주거지로 방문합니다. 공동현관 호출과 방문 차량 등록 방식이 있으면 예약할 때 전달해 주세요.",
        tags: "아파트 · 주거지 · 생활 중심지"
      },
      {
        name: "송화리·근내리",
        text: "송화리와 근내리의 주택, 아파트 생활권을 확인합니다. 골목 진입과 주차 공간이 제한되는 곳은 가까운 건물명을 함께 알려주세요.",
        tags: "주택 · 아파트 · 골목 생활권"
      },
      {
        name: "내리·대사리",
        text: "내리와 대사리의 외곽 주거지와 숙소는 현재 위치를 기준으로 이동 가능 여부를 확인합니다. 정확한 주소와 희망시간을 전달해 주세요.",
        tags: "외곽 주거지 · 숙소 · 사업장 인근"
      }
    ]
  },
  {
    slug: "oseong-jinwi",
    name: "오성·진위",
    title: "오성진위출장마사지 | 오성면·진위면·세교동 방문 케어",
    description: "오성진위출장마사지 방문 안내. 오성면, 진위면, 세교동의 외곽 주거지와 아파트·사업장 인근 숙소 방문 범위와 예약 방법을 안내합니다.",
    lead: "오성면과 진위면의 외곽 주거지, 세교동 아파트와 사업장 인근 숙소로 방문합니다. 넓은 생활권은 정확한 위치와 주차 가능 여부를 기준으로 배정 동선을 확인합니다.",
    summary: "오성면·진위면·세교동",
    quote: "“진위면 사업장 인근 숙소 / 오늘 오후 9시 / 아로마 90분 문의합니다.”",
    timing: "오성·진위 외곽 지역은 주소와 가까운 건물명을 함께 알려주세요.",
    localGuide: [
      "오성면과 진위면은 넓은 외곽 생활권이어서 면 이름만으로는 이동 위치를 정확히 판단하기 어렵습니다. 도로명 주소와 가까운 건물, 진입 가능한 도로를 함께 알려주세요.",
      "세교동 아파트는 단지 출입과 차량 등록 정보를 중심으로 확인하고, 산업단지 인근 숙소는 실제 이용 장소와 교대 시간을 함께 확인합니다. 서로 다른 생활권을 묶어 단정적인 방문시간을 안내하지 않습니다."
    ],
    localFaq: {
      question: "오성면이나 진위면은 주소를 꼭 보내야 하나요?",
      answer: "생활권이 넓고 같은 리 안에서도 진입 경로가 달라질 수 있어 정확한 도로명 주소가 필요합니다. 주소 전달이 어렵다면 가까운 건물명과 도로 위치를 함께 알려주세요."
    },
    areas: [
      {
        name: "오성면·숙성리",
        text: "오성면 숙성리와 주변 주거지, 사업장 인근 숙소를 확인합니다. 외곽 도로와 진입 위치가 나뉘므로 정확한 주소를 전달해 주세요.",
        tags: "외곽 주거지 · 사업장 · 숙소"
      },
      {
        name: "진위면·하북리",
        text: "진위면 하북리와 진위역 생활권의 주택, 숙박시설로 방문합니다. 오산 경계 지역은 현재 위치를 기준으로 이동 가능 여부를 안내합니다.",
        tags: "진위역 · 주택 · 경계 생활권"
      },
      {
        name: "세교동",
        text: "세교동 아파트와 평택 중심 생활권은 단지명과 방문 차량 등록 방법을 확인합니다. 대단지는 동·호수와 공동현관 호출 방식을 알려주세요.",
        tags: "아파트 · 대단지 · 중심 생활권"
      },
      {
        name: "견산리·가곡리",
        text: "진위산업단지와 주변 사업장 인근 숙소는 교대 시간과 이동 동선을 기준으로 확인합니다. 가까운 사업장 또는 건물명을 함께 알려주세요.",
        tags: "산업단지 · 교대 생활권 · 장기 숙소"
      }
    ]
  }
];

const allRegionLinks = [
  ["godeok", "고덕"],
  ["songtan", "송탄"],
  ["sosabeol", "소사벌"],
  ["pyeongtaek-station", "평택역"],
  ["anjung", "안중"],
  ["poseung", "포승"],
  ["paengseong", "팽성"],
  ["oseong-jinwi", "오성·진위"]
];

function structuredData(region) {
  const url = `${SITE_URL}/${region.slug}/`;
  const faqs = faqItems(region);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "평택출장마사지",
        url: `${SITE_URL}/`,
        telephone: "0507-1859-8915",
        address: {
          "@type": "PostalAddress",
          streetAddress: "평택로28번길 24",
          addressLocality: "평택시",
          addressRegion: "경기도",
          postalCode: "17912",
          addressCountry: "KR"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "평택출장마사지",
        inLanguage: "ko-KR",
        publisher: { "@id": `${SITE_URL}/#organization` }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${region.name}출장마사지 방문 케어`,
        serviceType: "출장 마사지 및 방문 케어",
        description: region.description,
        url,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: region.areas.map((area) => ({
          "@type": "AdministrativeArea",
          name: `평택시 ${area.name}`
        })),
        audience: {
          "@type": "PeopleAudience",
          requiredMinAge: 19
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "평택출장마사지",
            item: `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `${region.name}출장마사지`,
            item: url
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    ]
  };
}

function faqItems(region) {
  return [
    {
      question: `${region.name} 어느 지역까지 방문하나요?`,
      answer: `${region.areas.map((area) => area.name).join(", ")} 생활권을 확인합니다. 정확한 위치와 희망시간을 알려주시면 이동 가능 여부를 안내합니다.`
    },
    {
      question: `${region.name} 자택과 숙소에서 모두 이용할 수 있나요?`,
      answer: "자택, 아파트, 오피스텔, 호텔과 장기 숙소에서 이용할 수 있습니다. 숙박시설은 외부인 출입 가능 여부와 객실 호출 방법을 먼저 확인해 주세요."
    },
    {
      question: `${region.name} 방문시간은 얼마나 걸리나요?`,
      answer: `${region.timing} 현재 관리사 위치와 교통, 주차와 출입 조건에 따라 달라지며 예약 확정 전에 예상 방문시간을 안내합니다.`
    },
    {
      question: "예약할 때 무엇을 보내면 되나요?",
      answer: `현재 ${region.name} 내 위치 또는 가까운 건물명, 희망 시작시간, 이용 장소와 원하는 코스를 전화나 문자로 전달해 주세요.`
    },
    {
      question: "예약금이나 선입금이 필요한가요?",
      answer: "현재 안내 기준으로 예약금과 선입금은 받지 않습니다. 관리사 도착 후 예약한 코스와 결제 방식을 다시 확인합니다."
    },
    region.localFaq
  ];
}

function priceCards(region) {
  return `
        <div class="price-grid">
          <article class="price-card">
            <div class="price-card__top"><p class="price-kicker">DRY CARE</p><h3>타이 코스</h3><p>오일 없이 편한 복장 위에서 압과 스트레칭을 조절하는 기본 관리입니다.</p></div>
            <ul class="price-list" aria-label="타이 코스 가격"><li><span>60분</span><strong>70,000원</strong></li><li class="is-recommended"><span>90분 <small>추천</small></span><strong>90,000원</strong></li><li><span>120분</span><strong>110,000원</strong></li></ul>
            <dl class="course-meta"><div><dt>오일</dt><dd>사용하지 않음</dd></div><div><dt>압</dt><dd>요청에 맞춰 조절</dd></div></dl>
            <a class="button button--dark button--full" href="sms:050718598915" data-action="sms-click" data-course="${region.name} 타이 코스">타이 코스 문의</a>
          </article>
          <article class="price-card price-card--featured">
            <div class="price-ribbon">편안한 휴식에 추천</div>
            <div class="price-card__top"><p class="price-kicker">AROMA CARE</p><h3>아로마 코스</h3><p>부드러운 오일을 사용해 일정한 리듬과 편안한 압으로 진행하는 관리입니다.</p></div>
            <ul class="price-list" aria-label="아로마 코스 가격"><li><span>60분</span><strong>90,000원</strong></li><li class="is-recommended"><span>90분 <small>추천</small></span><strong>110,000원</strong></li><li><span>120분</span><strong>130,000원</strong></li></ul>
            <dl class="course-meta"><div><dt>오일</dt><dd>사용함</dd></div><div><dt>압</dt><dd>약한~중간 압</dd></div></dl>
            <a class="button button--gold button--full" href="sms:050718598915" data-action="sms-click" data-course="${region.name} 아로마 코스">아로마 코스 문의</a>
          </article>
          <article class="price-card">
            <div class="price-card__top"><p class="price-kicker">SIGNATURE CARE</p><h3>스페셜 코스</h3><p>충분한 시간 동안 압과 오일 관리 구성을 상담해 진행하는 복합 코스입니다.</p></div>
            <ul class="price-list" aria-label="스페셜 코스 가격"><li><span>60분</span><strong>100,000원</strong></li><li class="is-recommended"><span>90분 <small>추천</small></span><strong>120,000원</strong></li><li><span>120분</span><strong>140,000원</strong></li></ul>
            <dl class="course-meta"><div><dt>오일</dt><dd>구성에 따라 사용</dd></div><div><dt>압</dt><dd>선호도에 맞춰 조절</dd></div></dl>
            <a class="button button--dark button--full" href="sms:050718598915" data-action="sms-click" data-course="${region.name} 스페셜 코스">스페셜 코스 문의</a>
          </article>
        </div>`;
}

function renderPage(region) {
  const url = `${SITE_URL}/${region.slug}/`;
  const faqs = faqItems(region);
  const jsonLd = JSON.stringify(structuredData(region), null, 2);
  const regionCards = region.areas.map((area, index) => `
          <article class="region-card" id="area-${index + 1}">
            <div class="region-card__heading"><span>${String(index + 1).padStart(2, "0")}</span><h3>${area.name}</h3></div>
            <p>${area.text}</p>
            <p class="region-tags">${area.tags}</p>
          </article>`).join("");
  const localAreaLinks = region.areas.map((area, index) => `<a href="#area-${index + 1}">${area.name}</a>`).join("");
  const relatedLinks = allRegionLinks.map(([slug, label]) => `<a href="../${slug}/"${slug === region.slug ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  const faqMarkup = faqs.map((faq, index) => `
          <details>
            <summary><span>${String(index + 1).padStart(2, "0")}</span>${faq.question}<i aria-hidden="true"></i></summary>
            <div><p>${faq.answer}</p></div>
          </details>`).join("");

  return `<!doctype html>
<html lang="ko" data-page-path="/${region.slug}/">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${region.title}</title>
  <meta name="description" content="${region.description}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#0b1220">
  <meta name="format-detection" content="telephone=no">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="ko-KR" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ko_KR">
  <meta property="og:site_name" content="평택출장마사지">
  <meta property="og:title" content="${region.name}출장마사지 | 평택 ${region.name} 방문 케어">
  <meta property="og:description" content="${region.description}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE_URL}/images/og-pyeongtaek.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="차분하게 정돈된 ${region.name} 방문 케어 준비 공간">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${region.name}출장마사지 방문 안내">
  <meta name="twitter:description" content="${region.description}">
  <meta name="twitter:image" content="${SITE_URL}/images/og-pyeongtaek.jpg">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <link rel="manifest" href="../manifest.webmanifest">
  <link rel="preload" href="../images/hero.webp" as="image" type="image/webp" fetchpriority="high">
  <link rel="stylesheet" href="../css/style.css?v=20260731-3">
  <script src="../js/main.js?v=20260731-2" defer></script>
  <script type="application/ld+json" id="structured-data">
${jsonLd}
  </script>
</head>
<body>
  <a class="skip-link" href="#main-content">본문 바로가기</a>
  <div class="site-notice" role="note"><div class="container site-notice__inner"><span>${region.name} 생활권 예약제 방문</span><span aria-hidden="true">·</span><span>상담 24시간</span></div></div>
  <header class="site-header" data-header>
    <div class="container header-inner">
      <a class="brand" href="../" aria-label="평택출장마사지 메인 페이지"><img class="brand-logo" src="../images/logo-pyeongtaek.webp" width="600" height="111" alt="평택출장마사지"></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="메뉴 열기" data-menu-toggle><span></span><span></span><span></span></button>
      <nav class="primary-nav" id="primary-navigation" aria-label="주요 메뉴" data-nav>
        <a href="#area">${region.name} 방문지역</a><a href="#price">코스·가격</a><a href="#process">이용방법</a><a href="#faq">FAQ</a><a href="../">평택 전체</a>
        <a class="button button--small button--gold nav-call" href="tel:050718598915" data-action="phone-click">전화상담</a>
      </nav>
    </div>
  </header>
  <main id="main-content">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <img class="hero-media" src="../images/hero.webp" width="1600" height="900" alt="차분하게 정돈된 ${region.name} 방문 케어 준비 공간" fetchpriority="high" decoding="async">
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="eyebrow"><span></span> ${region.slug.toUpperCase()} VISIT CARE</p>
          <h1 id="hero-title">${region.name}출장마사지<br><em>${region.name} 생활권 방문 케어</em></h1>
          <p class="hero-lead">${region.lead}</p>
          <ul class="hero-badges" aria-label="${region.name} 방문 서비스 안내"><li>${region.name} 생활권 방문</li><li>24시간 상담</li><li>예약금·선입금 없음</li><li>자택·호텔·오피스텔</li></ul>
          <div class="hero-actions" aria-label="상담 방법"><a class="button button--gold" href="tel:050718598915" data-action="phone-click"><span aria-hidden="true">☎</span> 전화 상담</a><a class="button button--light" href="sms:050718598915" data-action="sms-click"><span aria-hidden="true">✉</span> 문자 예약</a></div>
          <a class="text-link" href="#area">${region.name} 방문지역 확인하기 <span aria-hidden="true">↓</span></a>
        </div>
        <aside class="hero-summary" aria-label="${region.name} 빠른 이용 안내"><p class="hero-summary__label">${region.slug.toUpperCase()} GUIDE</p><dl><div><dt>대표 코스</dt><dd>60분 70,000원부터</dd></div><div><dt>주요 생활권</dt><dd>${region.summary}</dd></div><div><dt>예약 방법</dt><dd>위치·시간·코스 전달</dd></div><div><dt>방문 확인</dt><dd>주차·출입 방법 안내</dd></div></dl><p>정확한 가능 여부와 방문시간은 상담 시 안내합니다.</p></aside>
      </div>
    </section>
    <section class="feature-strip" aria-label="${region.name} 방문 케어 핵심 특징">
      <h2 class="sr-only">${region.name} 방문 케어 핵심 안내</h2>
      <div class="container feature-grid"><article class="feature-card"><span class="feature-number" aria-hidden="true">01</span><h3>${region.name} 생활권 확인</h3><p>현재 위치를 기준으로 배정 가능 여부를 확인합니다.</p></article><article class="feature-card"><span class="feature-number" aria-hidden="true">02</span><h3>방문시간 안내</h3><p>교통과 이동 조건을 반영해 예상 시간을 안내합니다.</p></article><article class="feature-card"><span class="feature-number" aria-hidden="true">03</span><h3>비용 사전 안내</h3><p>코스와 기본 비용을 예약 확정 전에 안내합니다.</p></article><article class="feature-card"><span class="feature-number" aria-hidden="true">04</span><h3>출입 조건 확인</h3><p>주차와 건물 출입 방법을 미리 확인합니다.</p></article></div>
    </section>
    <section class="section section--light" id="area" aria-labelledby="area-title">
      <div class="container">
        <div class="section-heading section-heading--split"><div><p class="eyebrow eyebrow--dark"><span></span> ${region.slug.toUpperCase()} SERVICE AREA</p><h2 id="area-title">${region.name} 지역별 방문 안내</h2></div><p>${region.timing} 예약할 때 동 또는 가까운 건물명을 알려주면 더 정확하게 확인할 수 있습니다.</p></div>
        <nav class="region-chips" aria-label="${region.name} 지역 바로가기">${localAreaLinks}</nav>
        <div class="region-grid">${regionCards}
        </div>
        <article class="local-guide" aria-labelledby="${region.slug}-guide-title">
          <p class="eyebrow eyebrow--dark"><span></span> LOCAL BOOKING GUIDE</p>
          <h3 id="${region.slug}-guide-title">${region.name} 생활권 예약 체크포인트</h3>
          ${region.localGuide.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </article>
      </div>
    </section>
    <section class="section section--cream" id="price" aria-labelledby="price-title">
      <div class="container">
        <div class="section-heading section-heading--split"><div><p class="eyebrow eyebrow--dark"><span></span> COURSE &amp; PRICE</p><h2 id="price-title">${region.name} 방문 코스 및 가격</h2></div><p>원하는 방식과 시간을 선택한 뒤 ${region.name} 내 현재 위치와 희망 시작시간을 알려주세요. 최종 가능 여부는 예약 전에 확인합니다.</p></div>
${priceCards(region)}
        <p class="price-note"><span aria-hidden="true">ⓘ</span> 외곽 또는 특수 이동 조건의 추가 비용 여부는 예약 확정 전에 먼저 안내합니다.</p>
      </div>
    </section>
    <section class="section section--navy process-section" id="process" aria-labelledby="process-title">
      <div class="container">
        <div class="section-heading section-heading--split"><div><p class="eyebrow"><span></span> HOW TO BOOK</p><h2 id="process-title">${region.name} 예약 및 이용 방법</h2></div><p>위치, 시간, 코스 세 가지를 전달하면 배정과 이동 조건을 확인한 뒤 예약을 확정합니다.</p></div>
        <ol class="process-list"><li><span>01</span><div><h3>현재 위치 전달</h3><p>동 또는 가까운 건물명과 이용 장소를 알려주세요.</p></div></li><li><span>02</span><div><h3>시간·코스 선택</h3><p>희망 시작시간과 원하는 코스를 전달해 주세요.</p></div></li><li><span>03</span><div><h3>배정 확인</h3><p>이용 가능 여부와 예상 방문시간을 안내합니다.</p></div></li><li><span>04</span><div><h3>출입 정보 전달</h3><p>주차와 공동현관 또는 숙소 호출 방법을 공유해 주세요.</p></div></li><li><span>05</span><div><h3>도착 후 확인</h3><p>예약 코스와 결제 방식을 다시 확인합니다.</p></div></li></ol>
      </div>
    </section>
    <section class="section section--light" id="booking-info" aria-labelledby="booking-title">
      <div class="container booking-layout">
        <div class="booking-copy"><p class="eyebrow eyebrow--dark"><span></span> BEFORE BOOKING</p><h2 id="booking-title">${region.name} 방문 전 확인사항</h2><p>${region.timing} 정확한 위치와 출입 조건을 미리 알려주면 방문 안내가 원활합니다.</p><div class="booking-contact"><p>예약할 때 이렇게 보내주세요</p><blockquote>${region.quote}</blockquote><a class="text-link text-link--dark" href="sms:050718598915" data-action="sms-click">문자로 바로 문의하기 <span aria-hidden="true">→</span></a></div></div>
        <ul class="notice-list"><li><span aria-hidden="true">✓</span><div><strong>공동현관 호출 방법</strong><p>방문 호출 또는 출입 방법을 확인해 주세요.</p></div></li><li><span aria-hidden="true">✓</span><div><strong>방문 차량 등록</strong><p>사전 등록이 필요한 장소는 등록 방식을 알려주세요.</p></div></li><li><span aria-hidden="true">✓</span><div><strong>숙소 외부인 규정</strong><p>호텔과 장기 숙소는 외부인 출입 가능 여부를 확인해 주세요.</p></div></li><li><span aria-hidden="true">✓</span><div><strong>변경·취소 사전 연락</strong><p>배정과 이동 전 가능한 빨리 상담 채널로 알려주세요.</p></div></li><li><span aria-hidden="true">!</span><div><strong>과도한 음주 시 제한</strong><p>안전한 진행이 어렵다면 이용이 제한될 수 있습니다.</p></div></li><li><span aria-hidden="true">!</span><div><strong>서비스 범위 준수</strong><p>불법적이거나 안내 범위를 벗어난 요청은 거절합니다.</p></div></li></ul>
      </div>
    </section>
    <section class="section section--cream" id="faq" aria-labelledby="faq-title">
      <div class="container faq-layout">
        <div class="faq-intro"><p class="eyebrow eyebrow--dark"><span></span> ${region.slug.toUpperCase()} FAQ</p><h2 id="faq-title">${region.name}출장마사지 FAQ</h2><p>${region.name} 생활권 예약 전에 자주 확인하는 내용을 정리했습니다. 실제 운영 조건은 상담 시 안내가 우선합니다.</p><a class="button button--dark" href="tel:050718598915" data-action="phone-click">다른 내용 전화로 묻기</a></div>
        <div class="faq-list" data-accordion>${faqMarkup}
        </div>
      </div>
    </section>
    <section class="section section--light" aria-labelledby="other-region-title">
      <div class="container"><div class="section-heading section-heading--center"><p class="eyebrow eyebrow--dark"><span></span> OTHER AREAS</p><h2 id="other-region-title">다른 평택 지역 안내</h2><p>현재 위치와 가까운 지역 페이지에서 방문 범위와 이용 조건을 확인하세요.</p></div><nav class="region-chips" aria-label="다른 평택 지역 페이지">${relatedLinks}</nav></div>
    </section>
    <section class="final-cta" aria-labelledby="final-title">
      <div class="final-cta__glow" aria-hidden="true"></div><div class="container final-cta__inner"><p class="eyebrow"><span></span> ${region.slug.toUpperCase()} RESERVATION</p><h2 id="final-title">${region.name} 현재 위치와<br>희망 시간을 알려주세요</h2><p>이용 가능한 코스와 예상 방문시간을 확인해 안내합니다.</p><div class="final-actions"><a class="button button--gold" href="tel:050718598915" data-action="phone-click">전화하기</a><a class="button button--light" href="sms:050718598915" data-action="sms-click">문자 보내기</a></div><p class="final-note">상담 시 <strong>${region.name} 내 위치 · 희망 시간 · 코스</strong>를 함께 보내주세요.</p></div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="container footer-main"><div class="footer-brand"><a class="brand" href="../" aria-label="평택출장마사지 메인 페이지"><img class="brand-logo" src="../images/logo-pyeongtaek.webp" width="600" height="111" alt="평택출장마사지"></a><p>${region.name} 생활권의 자택과 숙소로 방문하는 예약제 휴식·바디 케어 서비스를 안내합니다.</p></div><dl class="business-info"><div><dt>상호명</dt><dd data-config-business>평택출장마사지</dd></div><div><dt>대표자</dt><dd>강철민</dd></div><div><dt>연락처</dt><dd><a href="tel:050718598915" data-action="phone-click" data-config-phone>0507-1859-8915</a></dd></div><div><dt>주소</dt><dd>경기 평택시 평택로28번길 24 (우 17912)</dd></div><div><dt>운영지역</dt><dd>${region.name} 및 평택 전 지역</dd></div></dl></div>
    <nav class="container footer-legal" aria-label="정책 안내"><a href="../privacy/">개인정보처리방침</a><a href="../terms/">이용약관</a></nav>
    <div class="footer-bottom"><div class="container"><p>© <span data-current-year>2026</span> <span data-config-business>평택출장마사지</span>. All rights reserved.</p><p>본 서비스는 의료 행위가 아닌 일반적인 휴식·바디 케어 안내입니다.</p></div></div>
  </footer>
  <nav class="mobile-cta" aria-label="빠른 상담"><a href="tel:050718598915" data-action="phone-click"><span aria-hidden="true">☎</span>전화</a><a href="sms:050718598915" data-action="sms-click"><span aria-hidden="true">✉</span>문자</a></nav>
  <p class="sr-only" aria-live="polite" id="site-status"></p>
</body>
</html>
`;
}

const workspaceRoot = path.resolve(process.cwd());

for (const region of regions) {
  const targetDir = path.resolve(workspaceRoot, region.slug);
  const targetFile = path.join(targetDir, "index.html");

  if (!targetDir.startsWith(`${workspaceRoot}${path.sep}`)) {
    throw new Error(`Unsafe target path: ${targetDir}`);
  }

  await mkdir(targetDir, { recursive: true });
  await writeFile(targetFile, renderPage(region), { encoding: "utf8", flag: "w" });
  console.log(`Updated ${region.slug}/index.html`);
}
