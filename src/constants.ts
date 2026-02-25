import { TravelNode } from './types';

export const TRAVEL_DATA: TravelNode[] = [
  {
    id: '00',
    order: 0,
    province: '南直隶',
    location: '江阴',
    historicalContext: '故里起航处。',
    description: '崇祯九年，先生于江阴祭祖辞亲，携静闻和尚扬帆而去。此行不仅是地理的跨越，更是布衣志向的践行。江阴作为其旅程的终点与起点，承载了厚重的家国情怀。',
    coordinates: { x: 5, y: 55 },
    timeline: ['丙子九月：祭祖辞亲', '十月：泛舟太湖', '入大运河向南'],
    adventure: '大丈夫当朝碧海而暮苍梧，岂能与儿女守床榻耶？',
    stayDuration: '筹备经年，祭祖三日',
    observations: ['太湖烟波', '运河纤道', '故里腊梅'],
    modernGuide: {
      highlights: ['徐霞客故居', '江阴要塞', '鹅鼻嘴公园'],
      tips: '建议春季前往，可顺道游览太湖鼋头渚。',
      bestTime: '3月 - 5月'
    }
  },
  {
    id: '01',
    order: 1,
    province: '浙江',
    location: '宁海',
    historicalContext: '壬戌开篇地。',
    description: '癸丑之三月晦，自宁海出西海门。由此开启三十年壮游。登梁皇山，望雁荡云影，笔端生风。宁海不仅是地理上的起点，更是《徐霞客游记》开篇的文化坐标。',
    coordinates: { x: 12, y: 65 },
    timeline: ['三月晦：出宁海西门', '四月：登天台山华顶', '五月：探雁荡山灵峰'],
    adventure: '入山之处，有石梁飞瀑，其长丈余，阔不盈尺。霞客徒步而过，向导失色。',
    stayDuration: '行旅七日',
    observations: ['石梁飞瀑', '雁荡奇峰', '云中僧舍'],
    modernGuide: {
      highlights: ['前童古镇', '浙东大峡谷', '宁海森林温泉'],
      tips: '5月19日中国旅游日，宁海有盛大开游节活动。',
      bestTime: '4月 - 6月'
    }
  },
  {
    id: '02',
    order: 2,
    province: '江苏',
    location: '宜兴',
    historicalContext: '洞天寻幽。',
    description: '深入张公、善卷诸洞，于石钟乳下燃犀细察，详述岩溶瑰丽。他不仅是游历者，更是最早的洞穴探险家，对地下世界的记录精确到尺寸与方位。',
    coordinates: { x: 18, y: 50 },
    timeline: ['探善卷洞：察石钟乳', '游张公洞：记地下泉', '考宜兴茶：论水质'],
    adventure: '洞内钟乳如林，燃火炬而入，石影森然。霞客伏地而察，竟得前人所未见之秘。',
    stayDuration: '探洞四日',
    observations: ['石钟乳林', '地下暗泉', '古人题刻'],
    modernGuide: {
      highlights: ['善卷洞', '竹海风景区', '丁蜀镇紫砂街'],
      tips: '一定要去丁蜀镇体验亲手制作紫砂壶。',
      bestTime: '四季皆宜'
    }
  },
  {
    id: '03',
    order: 3,
    province: '安徽',
    location: '黄山',
    historicalContext: '峰海奇观。',
    description: '两登黄山，经皮篷、攀天都。赞其“云海奇绝”。他记录了黄山松的坚韧与怪石的嶙峋，留下了“五岳归来不看山，黄山归来不看岳”的千古赞誉。',
    coordinates: { x: 25, y: 40 },
    timeline: ['初登黄山：攀天都峰', '再访黄山：宿皮篷', '观云海：待日出东方'],
    adventure: '攀绝壁，手足并用。至巅峰，云海在脚底翻涌，万峰如岛。五岳归来不看山。',
    stayDuration: '驻留九日',
    observations: ['天都险峰', '迎客古松', '云海日出'],
    modernGuide: {
      highlights: ['迎客松', '西海大峡谷', '光明顶日出'],
      tips: '建议山上住宿一晚，以观赏日出云海，需提前预订。',
      bestTime: '4月 - 11月'
    }
  },
  {
    id: '04',
    order: 4,
    province: '福建',
    location: '武夷',
    historicalContext: '丹霞神秀。',
    description: '泛舟九曲溪，仰观大王峰。记录下东南山水最深刻的朱红色褶皱，详述丹霞地貌之成因。武夷山的茶香与山影，在其笔下化作了灵动的文字。',
    coordinates: { x: 32, y: 52 },
    timeline: ['泛舟九曲：观三十六峰', '登大王峰：瞰武夷全景', '入一线天：察岩缝之光'],
    adventure: '溪水萦回，山壁如染。于一线天中，见日光如缕，叹造化之神力。',
    stayDuration: '行舟五日',
    observations: ['九曲溪流', '大王峰影', '一线天光'],
    modernGuide: {
      highlights: ['九曲溪竹筏漂流', '天游峰', '大红袍景区'],
      tips: '九曲溪漂流需提前预约，早晨光线最佳。',
      bestTime: '5月 - 10月'
    }
  },
  {
    id: '05',
    order: 5,
    province: '江西',
    location: '广信',
    historicalContext: '赣江源头。',
    description: '入三清山，穿行于峰林石柱间。记录江西境内河道变迁，考证石质之理，实为地学先驱。他对赣江水系的考察，纠正了前人诸多谬误。',
    coordinates: { x: 38, y: 45 },
    timeline: ['访三清山：察峰林石柱', '溯赣江：考水源之始', '经广信：记民风淳厚'],
    adventure: '峰林林立，如仙人指路。霞客不仅赏景，更以铁锤击石，考其理路。',
    stayDuration: '考察十日',
    observations: ['三清石林', '赣江源流', '红土地层'],
    modernGuide: {
      highlights: ['三清山东方女神', '巨蟒出山', '望仙谷'],
      tips: '三清山栈道较长，建议穿着舒适的登山鞋。',
      bestTime: '3月 - 11月'
    }
  },
  {
    id: '06',
    order: 6,
    province: '湖北',
    location: '武当',
    historicalContext: '皇室家庙。',
    description: '崇祯年间拜谒大岳，详记金顶筑造之工。在云烟缭绕中，他看到了宗教建筑与自然的完美融合，对武当山的植被分布亦有详尽记载。',
    coordinates: { x: 45, y: 42 },
    timeline: ['谒紫霄宫：观皇家规制', '登金顶：察铜铸之精', '宿南岩：听松涛阵阵'],
    adventure: '金殿辉煌，云烟缭绕。霞客记录其间香火之盛，更叹武当山势之雄。',
    stayDuration: '朝圣六日',
    observations: ['紫霄宫殿', '金顶铜铸', '汉江远眺'],
    modernGuide: {
      highlights: ['金殿', '紫霄宫', '太子坡'],
      tips: '武当武术闻名天下，可观看现场表演。',
      bestTime: '春秋两季'
    }
  },
  {
    id: '07',
    order: 7,
    province: '河南',
    location: '嵩山',
    historicalContext: '中岳探奇。',
    description: '考少林寺武学与碑刻，登峻极峰俯瞰中原平野。他在古老的石碑中寻找历史的痕迹，对嵩山的岩层构造也有着超前的观察。',
    coordinates: { x: 52, y: 35 },
    timeline: ['访少林：观僧众演武', '登峻极峰：望黄河如带', '察石淙河：论水石之趣'],
    adventure: '中原大地，一望无际。少林僧众演武，声震林木。霞客于碑刻间寻历史之痕。',
    stayDuration: '访古三日',
    observations: ['少林碑林', '峻极巅峰', '黄河远影'],
    modernGuide: {
      highlights: ['少林寺', '塔林', '嵩阳书院'],
      tips: '少林寺游客较多，建议清晨前往。',
      bestTime: '4月 - 10月'
    }
  },
  {
    id: '08',
    order: 8,
    province: '陕西',
    location: '华山',
    historicalContext: '西岳峥嵘。',
    description: '舍命攀登长空栈道，记录花岗岩地貌的险峻。他在万丈深渊边，保持着科学家的冷静观察，详述了华山“自古一条路”的险要。',
    coordinates: { x: 58, y: 42 },
    timeline: ['攀长空栈道：履险如夷', '宿东峰：待华山日出', '下苍龙岭：记山势之陡'],
    adventure: '栈道仅容一足，其下万丈深渊。霞客面壁而行，心如止水，记录石理之变。',
    stayDuration: '历险四日',
    observations: ['长空栈道', '花岗岩壁', '渭水秋风'],
    modernGuide: {
      highlights: ['西峰索道', '长空栈道', '鹞子翻身'],
      tips: '长空栈道需租用保险绳，恐高者慎入。',
      bestTime: '4月 - 10月'
    }
  },
  {
    id: '09',
    order: 9,
    province: '河北',
    location: '盘山',
    historicalContext: '北地幽静。',
    description: '于京师郊野寻盘山之胜，观察北方山体与江南丘陵的差异。他敏锐地察觉到了南北地理的性格，对北方植被的耐寒性多有记录。',
    coordinates: { x: 65, y: 25 },
    timeline: ['入幽燕：察北地风候', '访盘山：记三盘之胜', '观古松：论南北之异'],
    adventure: '北方之山，雄厚苍劲。霞客对比南北，笔触间渐生苍凉之感。',
    stayDuration: '游历三日',
    observations: ['北方松柏', '古刹钟声', '幽燕平原'],
    modernGuide: {
      highlights: ['挂月峰', '万松寺', '云罩寺'],
      tips: '盘山有“早知有盘山，何必下江南”之誉，秋季红叶极美。',
      bestTime: '9月 - 11月'
    }
  },
  {
    id: '10',
    order: 10,
    province: '山东',
    location: '泰山',
    historicalContext: '岱宗独尊。',
    description: '记录十八盘之艰辛，于日观峰待红日跃升。他笔下的泰山，是民族精神的图腾，也是地理的高度。他详细记录了泰山的台阶数量与古迹分布。',
    coordinates: { x: 72, y: 32 },
    timeline: ['步十八盘：数石阶之数', '宿南天门：听山风呼啸', '日观峰：迎岱宗旭日'],
    adventure: '众山皆小，唯我独尊。霞客于云海间见日轮如镜，瞬间万物生辉。',
    stayDuration: '驻留五日',
    observations: ['十八盘阶', '南天门云', '日观峰旭'],
    modernGuide: {
      highlights: ['南天门', '十八盘', '玉皇顶'],
      tips: '夜爬泰山看日出是经典体验，需备好厚外套。',
      bestTime: '4月 - 11月'
    }
  },
  {
    id: '11',
    order: 11,
    province: '山西',
    location: '五台',
    historicalContext: '清凉佛国。',
    description: '顶风冒雪考察五顶，详述气候垂直分布。他在严寒中记录了植被随高度变化的规律，对五台山的佛教文化与地理环境的共生深有感触。',
    coordinates: { x: 78, y: 28 },
    timeline: ['巡北台：踏终年之雪', '访显通寺：记佛门规制', '论气候：详述寒暑之变'],
    adventure: '山顶积雪经年不化，植被稀疏。霞客详细记录高度与草木之关系。',
    stayDuration: '考察八日',
    observations: ['五顶积雪', '高山草甸', '梵音缭绕'],
    modernGuide: {
      highlights: ['菩萨顶', '显通寺', '塔院寺大白塔'],
      tips: '五台山海拔较高，夏季也需带长袖衣物。',
      bestTime: '6月 - 8月'
    }
  },
  {
    id: '12',
    order: 12,
    province: '广东',
    location: '罗浮',
    historicalContext: '岭南仙山。',
    description: '在瘴气与花香间记录罗浮异草，观察荔枝林与红土地。他将岭南的丰饶与奇诡悉数收入笔底，对岭南水系的独特性也有深刻见解。',
    coordinates: { x: 82, y: 58 },
    timeline: ['入罗浮山：探朱明洞天', '察异草：记岭南物种', '论水土：析红土之成因'],
    adventure: '岭南之景，奇诡繁茂。霞客记异草百余种，不仅录形，更录其药性。',
    stayDuration: '采风六日',
    observations: ['罗浮异草', '荔枝丛林', '岭南瘴云'],
    modernGuide: {
      highlights: ['冲虚古观', '葛洪炼丹灶', '飞来石'],
      tips: '罗浮山盛产百草油，是当地特色手信。',
      bestTime: '10月 - 次年4月'
    }
  },
  {
    id: '13',
    order: 13,
    province: '广西',
    location: '桂林',
    historicalContext: '奇峰林立。',
    description: '在漓江与独秀峰之间穿梭，首次科学定义“岩溶”地貌。他发现了水与石交融的终极秘密，对桂林山水的成因做出了超越时代的科学推断。',
    coordinates: { x: 86, y: 50 },
    timeline: ['舟行漓江：记山影倒映', '探穿山岩：察溶洞构造', '考独秀峰：论孤峰之势'],
    adventure: '桂林山水，甲于天下。霞客入洞察石，谓之‘水石交融’，领先西方百余年。',
    stayDuration: '考察十二日',
    observations: ['漓江倒影', '象鼻奇石', '溶洞钟乳'],
    modernGuide: {
      highlights: ['漓江精华游', '遇龙河漂流', '阳朔西街'],
      tips: '漓江游船建议选择三星或四星级，视野更佳。',
      bestTime: '4月 - 10月'
    }
  },
  {
    id: '14',
    order: 14,
    province: '湖南',
    location: '衡山',
    historicalContext: '南岳烟云。',
    description: '历经祝融峰之巅，记录湘江北去的蜿蜒。他在风雷交加中，捕捉到了南岳的灵动与厚重，详述了南岳七十二峰的错落布局。',
    coordinates: { x: 90, y: 48 },
    timeline: ['登祝融峰：瞰湘江玉带', '宿上封寺：听晨钟暮鼓', '访水帘洞：记飞瀑之姿'],
    adventure: '烟云万顷，祝融独秀。霞客于风雷间记录南岳山脉之走向，视野广博。',
    stayDuration: '驻留七日',
    observations: ['祝融烟云', '湘江玉带', '古木参天'],
    modernGuide: {
      highlights: ['祝融峰', '南岳大庙', '藏经殿'],
      tips: '衡山雾气较重，登山前请查看天气预报。',
      bestTime: '5月 - 10月'
    }
  },
  {
    id: '15',
    order: 15,
    province: '贵州',
    location: '安顺',
    historicalContext: '飞瀑惊雷。',
    description: '于白水河畔偶遇黄果树，详述“珠崩玉碎”之势。他是第一个向世人详细描述这大自然杰作的布衣，对贵州喀斯特地貌的记录尤为详尽。',
    coordinates: { x: 94, y: 42 },
    timeline: ['抵白水河：闻雷鸣之声', '观黄果树：记巨瀑之宽', '探黔中洞：察石林之奇'],
    adventure: '瀑声如雷，百里可闻。水沫如雪扑面，霞客立于潭边，详记其宽广。',
    stayDuration: '考察四日',
    observations: ['黄果大瀑', '白水激流', '黔中石林'],
    modernGuide: {
      highlights: ['黄果树大瀑布', '天星桥', '陡坡塘'],
      tips: '黄果树景区较大，建议预留一整天时间。',
      bestTime: '6月 - 8月（水量最大）'
    }
  },
  {
    id: '16',
    order: 16,
    province: '云南',
    location: '鸡足',
    historicalContext: '最后的家园。',
    description: '晚年于大理编纂《鸡足山志》，病足而归。他在生命的最后时刻，依然守护着对大地的承诺，将滇西的壮丽与静谧永远留在了文字中。',
    coordinates: { x: 98, y: 38 },
    timeline: ['入大理：观洱海苍山', '驻鸡足山：撰地方志书', '病足归乡：完成万里之行'],
    adventure: '双足虽废，志气不减。于鸡足山顶，霞客完成了最后的约定。',
    stayDuration: '驻留数月',
    observations: ['鸡足金顶', '洱海月影', '滇南秘境'],
    modernGuide: {
      highlights: ['大理古城', '洱海环湖', '鸡足山金顶'],
      tips: '大理紫外线极强，务必做好防晒。',
      bestTime: '3月 - 5月'
    }
  }
];
