import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

const AudioVisualizer = ({
  aiVoice = false,
  voice = false,
  fetching = false,
}) => {
  const paths = [
    "M220,420.0894670335887C233.85665723179196,425.4250955835654,247.2320157502459,439.56896200622714,261.5863079908933,435.7702548665824C276.61669294090444,431.79262715328167,278.41935221707575,407.66203740063344,292.4300951006003,400.9216310461985C305.4715379875415,394.6475437092945,322.59156901918016,406.14137337375587,335.7404005298506,400.09557860479043C348.11161689650083,394.4073290341318,351.53392878926934,377.6344959673313,362.0054858033992,368.93106725972416C372.9991097948511,359.79372287829824,389.37110493098794,358.0242576272597,399.0337439376696,347.4893519211437C408.4269319745412,337.2482210893045,415.079709312005,323.5108872266121,416.35692927914687,309.673204929117C417.7526341356877,294.5518312560279,407.357938025299,280.44187891112756,406.62222640989046,265.27406225128107C406.0302416499923,253.0693938520041,410.5266456639026,241.23399027306783,412.4520235553119,229.1676197886374C414.46084154175077,216.57832904820123,420.818473754437,203.99134246671383,418.39807325183284,191.47466349596178C415.94297388875236,178.77854542132357,400.26961591073086,170.9829647081925,398.7181062078123,158.1450620488987C396.7891605106967,142.18408091674712,416.22854669124104,125.26036720044877,408.68030294363723,111.06537630471095C401.33107611660677,97.24465039962513,375.02630900458325,106.38058096792531,364.8620123367534,94.47635177208913C354.6131412390292,82.47307062701606,363.9271362499579,61.316696626035274,355.05628807649464,48.261959182915355C347.28195552697474,36.820903238221014,332.8551158571216,30.105200231902444,319.2881626031395,27.407833530021893C304.7162891663974,24.510669704330304,289.9469820625307,31.979790417534808,275.0948661697484,32.36411735737706C262.7325361003829,32.684016321213456,250.15386674731351,32.635914168674674,238.18993278956907,29.506405525815435C224.7768219221061,25.99782327054626,214.05466767616602,13.562407543783822,200.2125559110976,12.776510306101134C187.0636319221896,12.029969372407741,174.85188250399327,19.894680600611,162.8093733090368,25.22661249450745C151.06463055510352,30.42670555331391,141.0220795081544,38.80353366185264,129.34497518676918,44.153784575950176C117.3660690379655,49.642315962550185,104.06439925897386,51.71710787603091,92.2517683932265,57.55490894605141C80.02997157348157,63.59491979230298,65.24624990675098,68.04261275707226,57.84292237709063,79.49009239298064C49.99220575320941,91.62935251879745,58.202436530307565,109.9058725851272,50.48819354626239,122.13231291311475C42.456698726119754,134.86157129480017,21.373168739463285,135.5514446164199,14.142313176225425,148.7519618720913C7.477998981732063,160.9182115990092,10.155761890763499,176.72135142813494,13.168673143292642,190.2621446798259C16.290883871886393,204.29415771327,32.49291646525029,214.58979324472284,31.988236836475874,228.95610411692633C31.43497362250913,244.7054050056955,9.65137682803695,255.11956108099105,10.337192149687251,270.86364682813763C10.944356196957294,284.8021555214128,25.246080616490055,294.66084415501024,35.27293285596465,304.36202485328346C45.091344155254745,313.8615347602303,59.913221873339396,317.31525668485784,68.94375081942219,327.56666809344784C77.21075153570555,336.9513260646169,79.12502210489987,350.36786651009777,85.35347721323365,361.2132089686063C92.06914099718018,372.90690705365006,95.93361739417936,388.13588040327454,107.60626959219651,394.8880582465554C119.54482487145347,401.7940507382254,135.12853139171497,395.92864136645875,148.7786868510721,397.9022397010394C160.77680870959168,399.6369798941877,172.5855667310876,402.35082979784625,184.15982209144508,405.9565009590651C196.44850061928668,409.7847328753134,207.98853701671135,415.46434686581966,220,420.0894670335887",
    "M220,425.7178951466146C233.52204422908397,424.63654095484736,242.79646442141254,409.9344441016968,256.0469531696338,407.029352888909C269.00901704808024,404.18749712129255,282.65878600427686,411.5089477068791,295.7116519137104,409.1185636910338C308.52862617296296,406.77137874227276,319.309918706901,398.2582111648654,331.3356544243812,393.2416598794348C344.32101699231794,387.82479900602664,360.01668998945956,387.2198795211886,370.55501641516963,377.89755690888785C380.9718987846057,368.6826650807741,382.0809046101846,352.4908294579318,390.1816644172732,341.18581463041556C398.29770742965604,329.8594713267345,414.6810661522203,324.08217452788045,418.681416334783,310.7347625979009C422.94621514234007,296.5050017306953,414.16142999025004,281.46383121530516,412.50540196782043,266.70130519853814C411.0978821381393,254.15408508912338,408.90502311203437,241.63888808140103,409.5157010788945,229.027745509618C410.1266822677678,216.41034108421158,418.6361792259791,204.18198713811353,416.13237861106734,191.80042120612455C413.57946989424477,179.17601037746832,397.26828007418334,172.0345749694543,395.4131158878149,159.28893032005593C393.15788807341073,143.79470477546784,408.5722700356362,128.52985796508318,404.71443847621003,113.35506922254962C401.385383637717,100.26022484993668,385.17674048970457,94.75128618878088,376.3953813606577,84.48263062403667C367.58424839663684,74.17915843789058,364.7015922259048,57.11471464954285,352.17859481522987,51.92124383971137C337.6223381489974,45.88455057711818,318.86650419289714,62.59692669242939,305.10579320169876,54.917792190638984C290.79991815618547,46.93443008743295,294.4584473087704,21.568259037715002,281.0133441983358,12.207632261770536C269.7698188922156,4.379767858499629,253.69904296610397,8.10873159061838,240.08596285946868,9.650280303987998C226.55721680442971,11.182279007535204,214.39714757213116,18.714082111156312,201.0231789907621,21.265739265625953C188.36370108959252,23.68107672973288,174.96821760945863,20.891984355524883,162.57789311566003,24.438263353868585C150.1885901848131,27.984249967033605,138.16194866443908,33.81589301818645,128.27901311702936,42.086106627204266C118.26429509062564,50.46659812339217,116.08918727698251,67.14061805597312,104.4568679032736,73.07495549616725C90.17298012450254,80.3620155668078,69.08628171692413,68.2903881101299,56.77486992644582,78.56461967628222C45.768912393023015,87.74941165871589,51.70162448987349,106.74084783975819,47.641684485896924,120.48888014086204C44.07538061062276,132.56532974967357,36.99272691968018,143.3952394442963,34.01650106085689,155.6304851762884C31.073363727596217,167.7297041884105,35.18090523079781,181.33494600374743,30.07793828697491,192.69332997489317C23.50136570150144,207.33172318070086,3.3241574246566685,214.68221732525657,0.3975091591203439,230.46095594878636C-2.1618913513317373,244.25971412649702,11.718593419193017,256.112473704321,15.825842389422696,269.5321146874616C19.80341624829574,282.52806734504213,18.299418494197788,297.18878181612536,24.51897939833474,309.2731908393501C30.778149152208602,321.43455859785183,43.998811637080436,328.5388415448188,51.930286462367825,339.6819012171515C59.86275625981891,350.82635874227157,61.74149640290126,366.1542065275415,71.68939540598235,375.54368553551507C81.64901890432716,384.94423089047547,96.89380735858481,386.2408455537532,108.66852000655715,393.23516433810454C120.21226650002232,400.0922864908848,128.22084776976578,413.39450710403077,141.19970123475247,416.83363054728534C154.70254179075758,420.41159955910615,168.94357633146495,411.31994562743,182.82447599137186,412.8849344331544C195.880891975124,414.356967612421,206.90267753853388,426.765284454377,220,425.7178951466146",
    "M220,408.5572869664369C233.8861916719634,407.9161136139444,245.19083152006792,422.5571892096192,259.0894235014924,422.81518795445254C272.1605652493833,423.05782678930734,283.84324617575436,414.64415986966617,296.05213054201164,409.9690381890044C308.320668670321,405.27107342228027,322.8635765008235,403.8927133972184,332.3199124335764,394.77319523658684C342.3943021012077,385.0576373096493,343.66490012767997,369.2178878053445,350.7960747843302,357.174975324416C356.9022302738495,346.863084269182,361.9321993709033,334.8955162900052,371.8017179393963,328.0975139934941C385.4969063499861,318.6644376361985,409.1863242730524,324.44926271114895,418.4034779398707,310.6078323859846C426.5961410273916,298.30488297203493,409.55223240647564,281.1895833159824,412.6609663586563,266.73904471140474C415.6911725712003,252.6535319181719,436.60532780445055,244.6527505581595,435.68555790941105,230.2743694365226C434.69417227960525,214.77644924937718,414.5381417675636,207.0373330516599,407.94254627068534,192.97794132812956C402.78387777459045,181.98155120797128,403.4457797571873,169.18772562946057,401.4107843920652,157.213117068374C399.2323682130152,144.39457139778185,401.60218929354653,130.16260843263353,395.3318216406685,118.77212557825264C389.09962406963155,107.45098086906985,376.1175985091413,101.61057266903822,366.2247006067407,93.29557566462658C356.8592859024533,85.42392915826505,347.5679066028467,77.56401718024532,337.69990076965814,70.33240102750642C327.92987329907623,63.17258680938558,318.0832153997273,56.16462294038807,307.50508724823624,50.26381102806935C296.8471405444001,44.31847382188418,286.21894649867716,37.72115872832693,274.3265512981949,34.98075751087569C262.4136445160888,32.235629746559326,248.88568392002583,39.2172750290298,237.74286721723925,34.188288016750946C222.23420077389682,27.1889013983002,215.4190151037908,5.809216592818395,199.0904340929589,1.0251189706849662C185.7307317336672,-2.8891293186856117,169.5173882965714,2.3284026923182832,158.63517219374447,11.010589023599046C145.90536137445542,21.1668465772705,146.36145290005098,42.51840361130505,133.9171210142947,53.022510184857445C124.07189267293103,61.33274561477323,108.33295562973728,57.643971361793184,96.73687021836116,63.25817986578444C85.09747028328997,68.89335896102682,75.08625334866944,77.44168783162148,65.5158868024169,86.13875391475331C55.74328168553949,95.01960420351426,46.549743469996926,104.64897537205655,39.152703174659166,115.5877644956732C31.696684075839126,126.61377184013182,25.28785211427365,138.53670124071874,21.462320660022595,151.28544109431058C17.64372589063917,164.0110641622005,16.99216246788019,177.47475656255645,16.59714472613389,190.75508447501704C16.21079058528881,203.74414582217815,16.46283675557016,216.8510926724585,19.133826082097475,229.56843517079673C21.763981423880736,242.09135541352936,31.309041705099574,252.77733086029326,32.30293116014049,265.5348162033737C33.44298185562477,280.16841550784625,18.073857664665304,296.14221096903475,25.315012977898647,308.90965448454585C33.02828893838193,322.50953059341043,57.698791938759335,316.4621059678108,67.90450285038314,328.3067132220594C77.11960598999897,339.0016347656264,68.80802094235257,358.3284984847787,77.48862496913361,369.4616286118833C85.58543985892727,379.8460319903862,101.44852551429608,380.2132013856371,113.1240891489142,386.3021634237048C124.31731137965352,392.1395779913877,135.05296493630982,398.64746981233986,145.88469208913224,405.1310891432786C157.46850556111244,412.0648898099016,166.72254584835304,425.83395510177047,180.20860005970982,426.4573875732042C194.77011983092228,427.13053659934064,205.43844364903828,409.22964423498195,220,408.5572869664369",
    "M220,430.70293049483246C233.66804410029198,428.349648436481,243.45561884422648,414.93578862218766,256.9704060912587,411.820681619027C270.0806573319345,408.79881862506886,284.0873117742769,415.79589162568294,297.226516494303,412.90251248130204C310.1296272808074,410.0611234898963,321.6108553105025,402.54251785520233,332.57595947516535,395.17161221020984C343.5121725731357,387.8201275687369,351.61516844985806,376.96762860514355,362.2530541379819,369.1907094565063C373.6882726729924,360.83089317336487,391.7751894173991,359.56011039880303,398.4085286435506,347.04413812565844C405.5530567926405,333.5636401185349,392.0394545292148,315.33874781229065,398.1930791975471,301.3780525418361C404.26021956737515,287.6135637354043,429.91187105322086,286.3011249124763,431.7629522068428,271.3731363362384C433.7799695562029,255.10696027453136,412.25632032979564,244.5007339869287,407.1783748090262,228.91640493668822C403.48201615030985,217.57219704994964,404.4290167893873,204.99890858009724,406.29605973010257,193.21467035402023C408.61190618826146,178.5977133666757,422.4537379111977,165.44923960628182,419.5324310206957,150.94115419024044C416.83063144958766,137.52320789979643,399.76218569631897,131.93365305247602,391.72574024295056,120.85409764394478C384.1943183934401,110.47079993218101,381.1254046534978,97.32995361473112,373.2833477204327,87.17922312353157C365.41108306915896,76.9893918697506,354.4624042313707,69.72470077152397,345.2638750687116,60.7140252716552C335.63295680719375,51.279790984223645,327.5816874314066,40.24528571809432,316.9318152893437,31.978509653152173C306.0411437543041,23.524817291773857,294.67666668989,14.588793845881918,281.340216161934,11.09440858659357C267.9397416313774,7.583247909403787,253.41775524776384,8.844729007474546,239.88164385083013,11.790005767804812C226.28795707614609,14.747810160117613,215.08972212946193,24.62350022578002,201.7064849666906,28.421643192602257C189.8477493323691,31.78713487425572,177.40213272658212,32.296666721205,165.09597651420995,33.01406785076888C151.25022263192858,33.821221547129895,136.4914196273157,27.905081417665922,123.58241295100946,32.9759732809716C111.14003385472684,37.863565370865686,105.03345681012063,52.187423887153685,94.69927603857688,60.667168092839475C84.47978517465522,69.05280313775975,68.91944703995605,71.89395955913213,62.24622347547985,83.3055745142072C55.03472783115788,95.63766720495506,62.57005028429407,112.6906849182001,56.66918871491027,125.70091213759336C51.28264448200098,137.57717182839312,37.56051063549712,143.59207678038865,30.063400680612176,154.26230383236688C22.323356278211932,165.27828621264283,14.132579653822694,176.82007164063856,11.47799986197678,190.0190625597354C8.849849659724775,203.0866413758256,10.87685716959037,217.05636862252695,14.877056672665885,229.7712100897227C18.9352118936719,242.670266810442,28.54938250850696,253.00433657465206,35.02793071478206,264.87373846443074C40.80001886547373,275.4488290283057,49.369393193559134,285.0834768377172,51.53624764433319,296.9348178522469C54.23095744192324,311.6731980581836,42.988533639825725,328.02385634202,49.077055181550605,341.7136780144862C54.52463161760277,353.96235767269366,72.01460601344851,355.77721477042746,81.7873264146907,364.9532802864948C91.51154501864863,374.08380519040355,95.35193556134452,389.3096969612719,106.8922574194845,395.9990828739695C118.60677563146075,402.78944228200965,134.26891021521288,397.71484386453045,146.86715378176305,402.6770184752188C159.41090018865606,407.61772783794805,167.90277614340667,420.1639882173726,180.4917394583712,424.9883208740081C192.94527375001354,429.7607545264505,206.8567210336135,432.9658616320568,220,430.70293049483246",
    "M220,431.4672593159291C233.26694220754862,433.9432003307795,248.39221466516742,435.57266895666055,260.33772721454903,429.29200264009665C273.8015483020546,422.2130458145131,278.26763893989295,404.4526546552797,289.9376177821072,394.6957236912364C299.1007012814196,387.0347352413558,310.153173548774,381.51709401775577,321.5915165124354,378.07948532998563C335.62570292497423,373.86173794377805,355.01651505117485,382.8045692141033,365.0484081479647,372.12239236805135C375.494166729211,360.9995225986612,361.40476920266417,339.41596480324876,369.8416180303112,326.70173316685316C377.969832666132,314.4526096159471,402.4541339357926,319.48284901130904,408.78329085785765,306.21444015465977C415.03732120444806,293.10352622690414,394.941009471125,277.2944463546382,399.9189154375665,263.6478566053141C405.58266913738584,248.12106206485734,434.07814421003286,246.66523116624342,436.4705299472283,230.31176226333972C438.6886879529142,215.14925004646082,416.6968524848416,206.56611282613625,410.30711168864,192.63796814629652C405.19835814899767,181.5020769257824,402.8755627985395,169.00865787213493,402.7265382022605,156.75773024710853C402.53747789446,141.215570057034,417.08892588127816,124.1585217331585,409.310408675314,110.70158459090942C401.5289828369563,97.23961547633786,379.84560388898433,100.67635641031492,366.103963867477,93.40019464473777C355.29091897042355,87.67471619192797,345.1713228368254,80.53016821098623,336.338727356509,72.0632738251812C326.9236982724053,63.03806067327838,323.078062377712,48.426779485165945,312.0029561838146,41.53916248901309C301.18897580013936,34.813939833567446,287.1397138049248,36.4274522163744,274.69473774438825,33.72682962954304C262.6034216471128,31.102953038862648,250.67119087323564,28.145864337812945,238.56273314220672,25.602263601997628C225.95776194301735,22.95436122422185,213.587758199079,17.441325048855198,200.72939269368095,18.189069968071585C187.92901757619103,18.933442606580645,176.3566906324061,25.88179198675563,164.18960215782673,29.927240271578157C152.17873880171115,33.92074509935621,139.97766631971027,37.21806872037496,128.36354174700352,42.25006929454185C116.56848162929327,47.36046301497174,102.48828689181,50.263033119797235,94.32847896834902,60.19566126195736C85.49781871103878,70.94489278901662,87.84468525477091,87.49664519936294,81.16706176400965,99.7005742190679C75.49154540886408,110.07306659516541,66.04495990284008,117.78723249935575,58.04981943335092,126.49801965453652C49.22429622581696,136.11351727928917,38.96202722572573,144.31400121561992,30.840929410946956,154.53140914234672C22.151813873894376,165.4634579846798,10.106546750252221,175.7145638206447,7.963097420582342,189.51369588315293C5.830117324982565,203.24542894465523,14.603143410772578,216.44686786883287,19.185647675485626,229.56596660405347C23.435645242735877,241.73314299678398,34.20176214113673,252.15228981110587,34.34430771472142,265.0395836097629C34.523162617935164,281.2095398355627,17.698021980855177,295.30288450627387,20.08965854088445,311.2959938970527C22.148011139802612,325.06040059222767,34.844706653882696,335.6638792951297,46.12467469371557,343.8160586425189C57.9640611155196,352.37253691734753,76.54711080345866,349.285563383356,86.90596534052277,359.58500628054026C97.49584677592014,370.11415105630414,91.71954098218224,392.059446995617,103.66281331355808,401.0241959906175C115.07976412842667,409.5938823800572,132.2141355445513,401.6987478316818,146.27749446622244,404.1499162393459C158.68854735728146,406.3130965237894,170.6500925741462,410.38139434618915,182.4633360148439,414.7587065601491C195.33498534227382,419.5282034470634,206.50608925490974,428.94896033325244,220,431.4672593159291",
    "M220,412.89466063802445C232.84444015205827,411.12927916283127,245.38611496845942,418.3212333897117,258.33770773830344,418.9149162148689C271.82126987576316,419.53298376881395,286.12046409505484,421.4779039301934,298.66699148483,416.50064505872626C311.20383212026826,411.527228962432,318.42742213081004,398.09961608030494,329.6532298355437,390.62375611896294C340.7702855482815,383.22031986948764,355.53876070588865,381.50382340827593,365.14833755491605,372.2271953138228C374.76936882989554,362.939509661762,379.8478481515916,349.781725608567,384.8203525241225,337.3680417141386C389.6590210829993,325.2884742648626,388.070297439573,311.02898270138513,394.2495260940771,299.5770921841113C400.7797978044106,287.47461777247446,419.692239183255,282.5403235482786,421.74176843233215,268.94202345774215C423.90858805813156,254.56552040127104,403.4586730339214,243.27430381793454,404.91571600027413,228.80862121331216C406.4618821913791,213.45811344447827,430.20906705307135,205.26853816259646,429.7083945040104,189.84848480178857C429.2448946170257,175.57330034552353,409.3157698156862,169.40271125158444,402.577970601917,156.80914999352254C396.6230509890906,145.67886211291778,395.6805994072037,132.60935988638002,392.54270558680804,120.38242248275009C389.01521734847694,106.6374137760257,389.8703578526672,91.28467391375541,382.6298473610979,79.08043508288323C375.67665149709677,67.36047927853632,362.4708034725972,60.867326516224665,352.0347158996737,52.104200764001405C341.4850610204671,43.2457131647885,332.8252028891224,30.93060844611772,319.8332630714169,26.35048613455275C306.35430218942577,21.59867152191222,291.33289962027715,26.40453558626399,277.05961356311303,25.67280223215414C264.2708642230268,25.017175040769263,251.49684086983038,24.433998826246366,238.88754041162204,22.20072798457377C225.71162997174906,19.86710315777359,213.48840776473403,11.072591449863495,200.14317322031525,12.049901895046302C186.87697443308883,13.021424321233262,174.91706248038545,20.82488664414912,163.54107781061802,27.718569178180417C152.4546943823195,34.43675753934651,145.16427503401232,46.55047399430004,133.5869283456647,52.38202576318334C121.92276920643332,58.25730528032712,107.05648924302284,55.50359297623149,95.67221634170673,61.90436233141399C84.55892429361735,68.15277360837665,78.6626216742753,80.95113051845544,68.67667925904443,88.87759616916597C57.50797972396984,97.74288995384165,40.74596380206329,100.08755645852374,32.71972524620158,111.87368295698725C24.933253377363428,123.30772416871164,27.363019641041376,138.93059935415772,25.278169298126326,152.60611914842028C23.31418234658621,165.48883877514726,19.94002598517476,178.31698758001724,20.606278567419412,191.3315108991146C21.26767566566189,204.25118759178866,28.160200878025737,216.1939739970809,29.193569747210347,229.08923051818155C30.204967494925604,241.71031268020067,23.492479507318052,254.6448787719613,26.662261978584688,266.90322774029187C29.843914679012435,279.20748188120444,42.0291042722614,287.3052652291722,47.244051081645935,298.89499834282043C52.478512684281206,310.5281012651764,52.76119786626703,323.8428936301874,57.59490551035334,335.6481442536639C62.611606413233986,347.9003150141323,68.86668769411885,359.66625565933236,76.54364122760452,370.45269903689393C84.43955152251107,381.5467858955446,91.92404915337394,394.16915153956165,103.88188901239239,400.6833075492505C116.07981027511109,407.3282503680259,131.89938952104933,402.6946660613112,144.86720082044712,407.6726594622199C157.69556498946702,412.5971228665262,165.8678812438889,428.78743935344005,179.5758906788017,429.7401955686848C194.17167544697148,430.7546553792267,205.50527025402747,414.88686326254845,220,412.89466063802445",
  ];

  const [index, setIndex] = useState(0);

  const { d } = useSpring({
    from: { d: paths[index] },
    to: { d: paths[(index + 1) % paths.length] },
    config: { duration: 200 }, // Animation duration
    reset: true,
    onRest: () => setIndex((prevIndex) => (prevIndex + 1) % paths.length),
  });

  return (
    <div className=" w-[100vw] flex justify-center min-h-[50vh] items-center">
      <div
        className={
          !voice && !fetching && !aiVoice
            ? "h-[.5em] w-[70vw] linear-bg rounded-full shadow-lg" // 1 0
            : "h-[15em] w-[15em] linear-bg rounded-full p-4 shadow-lg" //0 0
        }
      >
        {fetching ? ( // 1 1
          <div className="bg-white border-[12px] border-t-[#9068bf] border-l-[#9068bf] border-white  border-b-[#1ba0e3] border-r-[#1ba0e3] h-full w-full rounded-full relative animate-spin"></div>
        ) : (
          // 0 1
          <></>
        )}
        {aiVoice ? (
          <svg
            viewBox="0 0 440 440"
            xmlns="http://www.w3.org/2000/svg"
            className=" animate-pulse"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="10%" stopColor="white" />
                <stop offset="100%" stopColor="white" />
              </linearGradient>
            </defs>
            <animated.path d={d} fill="url(#gradient)" />
          </svg>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AudioVisualizer;
