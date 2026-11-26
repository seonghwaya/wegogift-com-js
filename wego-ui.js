/*!
 * wego-ui.js — 위고기프트(wegogift.com) UI 리프레시 스크립트
 * PC(/, /shop/*) 와 모바일(/m/*) 을 자동 판별해서 스타일을 덮어씁니다.
 * 원본 HTML/CSS 는 건드리지 않으며, 이 스크립트만 빼면 원래대로 돌아갑니다.
 *
 * 색/둥글기 등은 아래 THEME 값만 바꾸면 전체에 반영됩니다.
 */
(function () {
  'use strict';
  var VERSION = '2.0.6';
  if (window.__wegoUI === VERSION) return;
  /* 예전 버전이 페이지에 남아 먼저 실행됐다면 그 스타일을 걷어내고 이 버전으로 교체 */
  var oldStyle = document.getElementById('wego-ui-style');
  if (oldStyle && oldStyle.parentNode) oldStyle.parentNode.removeChild(oldStyle);
  window.__wegoUI = VERSION;

  var THEME = {
    navy: '#0a2c78',   // 브랜드 메인
    blue: '#2f6bff',   // 포인트
    ink: '#16181d',    // 본문 글자
    sub: '#6b7280',    // 보조 글자
    line: '#e8ebf0',   // 구분선
    bg: '#f5f7fa',     // 옅은 배경
    accent: '#ffb800', // 강조(옐로)
    radius: '14px',
    dynamic: true,     // 그라데이션·스크롤 등장·따라다니는 구매바 등 움직임 레이어
    webfont: true      // Pretendard 웹폰트 사용 (false 면 시스템 폰트)
  };

  var doc = document, root = doc.documentElement;
  var path = location.pathname;
  var isMobile = /^\/m(\/|$)/.test(path);
  var page = 'etc';
  if (/\/view\.php$/.test(path)) page = 'view';
  else if (/\/(list|listmall|brandlist|planlist|search|goods_hall)\.php$/.test(path)) page = 'list';
  else if (/^\/(m\/?)?(index\.php)?$/.test(path)) page = 'home';

  root.className += ' wg ' + (isMobile ? 'wg-m' : 'wg-pc') + ' wg-' + page;

  /* ------------------------------------------------------------------ 공통 */
  var FONT_SKIP = ':not(.ionicons):not(.fa):not([class*="ion-"]):not([class*="fa-"])';
  var common = [
    ':root{--wg-navy:' + THEME.navy + ';--wg-blue:' + THEME.blue + ';--wg-ink:' + THEME.ink + ';--wg-sub:' + THEME.sub +
      ';--wg-line:' + THEME.line + ';--wg-bg:' + THEME.bg + ';--wg-r:' + THEME.radius +
      ';--wg-font:"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Malgun Gothic","맑은 고딕",sans-serif' +
      ';--wg-shadow:0 12px 32px rgba(16,24,40,.12)}',
    'html.wg body,html.wg h1,html.wg h2,html.wg h3,html.wg h4,html.wg th,html.wg td,html.wg dt,html.wg dd,html.wg p,html.wg li,' +
      'html.wg a' + FONT_SKIP + ',html.wg span' + FONT_SKIP + ',html.wg input' + FONT_SKIP + ',html.wg button' + FONT_SKIP +
      ',html.wg select,html.wg textarea{font-family:var(--wg-font)}',
    'html.wg body{color:var(--wg-ink);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}',
    'html.wg ::selection{background:var(--wg-navy);color:#fff}',
    'html.wg a,html.wg button,html.wg select,html.wg input{-webkit-tap-highlight-color:transparent}',
    'html.wg select,html.wg input[type=text],html.wg input[type=number],html.wg input[type=password],html.wg textarea{transition:border-color .15s,box-shadow .15s}',
    'html.wg select:focus,html.wg input[type=text]:focus,html.wg input[type=number]:focus,html.wg textarea:focus{outline:0;border-color:var(--wg-navy);box-shadow:0 0 0 3px rgba(10,44,120,.12)}',
    /* 버튼 공통 */
    'html.wg .btn_small,html.wg .btn_lsmall,html.wg .btn_medium,html.wg .btn_large{border-radius:8px;transition:background-color .15s,border-color .15s,color .15s,box-shadow .15s,transform .15s}',
    'html.wg .wset{background:var(--wg-navy);border-color:var(--wg-navy)}',
    'html.wg .wset:hover{background:#082462;border-color:#082462;box-shadow:0 8px 20px rgba(10,44,120,.28)}',
    'html.wg .vi_btn1{background:#fff;border-color:var(--wg-navy);color:var(--wg-navy)!important}',
    'html.wg .vi_btn1:hover{background:#f0f4ff;border-color:var(--wg-navy);color:var(--wg-navy)!important}',
    'html.wg .vi_btn2{background:#eef3ff;border-color:#eef3ff;color:var(--wg-navy)!important}',
    'html.wg .vi_btn2:hover{background:#e0e9ff;border-color:#e0e9ff;color:var(--wg-navy)!important}',
    'html.wg .vi_btn .grey,html.wg .sp_btn .grey{background:#f1f3f6;border-color:#f1f3f6;color:#374151!important}',
    'html.wg .vi_btn .grey:hover,html.wg .sp_btn .grey:hover{background:#e5e8ee;border-color:#e5e8ee;color:#111!important}',
    'html.wg .bx-white{border-color:#d5dae3}',
    'html.wg .bx-white:hover{border-color:var(--wg-ink)}',
    /* 상품코드 뱃지 */
    'html.wg .tit_op .pr_code{font-size:13px!important;font-weight:700!important;line-height:26px!important;color:var(--wg-navy)!important;border:1px solid #d5ddf0!important;border-radius:999px;padding:0 14px 0 0!important;overflow:hidden;letter-spacing:.2px}',
    'html.wg .tit_op .pr_code:before{font-size:12px!important;font-weight:600!important;background-color:var(--wg-navy)!important;padding:0 10px 0 13px!important;margin-right:10px!important}',
    /* 안내 박스 */
    'html.wg .lb-danger{border-radius:10px;line-height:1.6}',
    /* 팝업 */
    'html.wg .hd_pops{border:0;border-radius:14px;overflow:hidden;box-shadow:0 20px 50px rgba(16,24,40,.25)}'
  ];

  /* -------------------------------------------------------------------- PC */
  var P = 'html.wg-pc ';
  var pc = [
    /* 상단 */
    P + '#tnb{border-bottom-color:var(--wg-line)}',
    P + '#tnb_inner .tnb_ul li a{font-size:12px;color:var(--wg-sub);transition:color .15s}',
    P + '#tnb_inner .tnb_ul li a:hover{color:var(--wg-navy)}',
    P + '#tnb_inner .tnb_ul li:before{background:var(--wg-line)}',
    P + '#tnb_inner .sch_text li>a{border-radius:6px;background-color:#eef1f6;color:#5b6475;font-size:11px;transition:background-color .15s,color .15s}',
    P + '#tnb_inner .sch_text li:hover>a{background-color:var(--wg-navy);color:#fff}',
    P + '#tnb_inner .sch_text .stxt_bx{border:0;border-radius:12px;box-shadow:var(--wg-shadow);padding:14px 18px;line-height:1.9}',
    P + '#tnb_inner .sch_text .stxt_bx a:hover{color:var(--wg-blue)}',
    /* 검색창 */
    P + '#hd_sch .sch_frm{width:300px;height:42px;padding:0 50px 0 22px;background-color:#fff;border:2px solid var(--wg-navy);border-radius:999px;box-sizing:content-box;transition:box-shadow .2s}',
    P + '#hd_sch .sch_frm:focus-within{box-shadow:0 0 0 4px rgba(10,44,120,.12)}',
    P + '#hd_sch .sch_frm .sch_stx{height:42px;line-height:42px;font-size:14px;background:transparent;box-shadow:none!important}',
    P + '#hd_sch .sch_frm .sch_submit{width:50px;height:42px;line-height:42px;font-size:20px;color:var(--wg-navy);background:transparent;cursor:pointer}',
    /* GNB */
    P + '#gnb{border-color:var(--wg-line)}',
    P + '#gnb.gnd_fixed{background-color:rgba(255,255,255,.94);-webkit-backdrop-filter:saturate(180%) blur(12px);backdrop-filter:saturate(180%) blur(12px);box-shadow:0 6px 24px rgba(16,24,40,.08)}',
    P + '#gnb_inner .gnb_li>ul>li>a{font-size:15px;font-weight:600;letter-spacing:-.3px}',
    P + '#gnb_inner .gnb_li>ul>li>a:after{content:"";position:absolute;left:0!important;right:0!important;bottom:9px;height:2px;border-radius:2px;background:currentColor;transform:scaleX(0);transition:transform .25s ease}',
    P + '#gnb_inner .gnb_li>ul>li:hover>a:after{transform:scaleX(1)}',
    P + '#gnb_inner .gnb_li>ul>li ul{border:0;border-radius:0 0 12px 12px;box-shadow:var(--wg-shadow);padding:10px 0}',
    P + '#gnb_inner .gnb_li>ul>li ul a{line-height:28px;font-size:13px;color:#374151}',
    P + '#gnb_inner .gnb_li>ul>li ul a:hover{background-color:var(--wg-bg);color:var(--wg-navy)}',
    P + '#gnb_inner .all_cate .con_bx{border:0;border-radius:0 0 16px 16px;box-shadow:0 24px 48px rgba(16,24,40,.18);padding:14px 22px}',
    P + '#gnb_inner .all_cate .con_bx .c_box .cate_tit{border-radius:8px;background-color:var(--wg-bg);color:var(--wg-navy);font-weight:700}',
    P + '#gnb_inner .all_cate .con_bx .c_box li a{border-radius:6px;color:#4b5563}',
    P + '#gnb_inner .all_cate .con_bx .c_box li a:hover{background-color:var(--wg-bg);color:var(--wg-navy)}',
    P + '#gnb_inner .all_cate .allc_bt,' + P + '#gnb_inner .gnb_cart{transition:background-color .15s}',
    P + '#gnb_inner .all_cate .allc_bt:hover,' + P + '#gnb_inner .gnb_cart:hover{background-color:var(--wg-bg)}',
    /* 우측 퀵메뉴 */
    P + '#qcr .qcrM{box-shadow:-4px 6px 18px rgba(16,24,40,.08);border-radius:10px 0 0 10px}',
    P + '#qcr .qcrM li{border-color:var(--wg-line)}',
    P + '#qcr .qcrM li:first-child{border-top-left-radius:10px}',
    P + '#qcr .qcrM li:last-child{border-bottom-left-radius:10px}',
    P + '#qcr .qcrM li .ionicons{color:#8a93a3;transition:color .15s}',
    P + '#qcr .qcrM li:hover .ionicons{color:var(--wg-navy)}',
    P + '#qcr .qcrM li .qm_txt{border:0;border-radius:6px;background:var(--wg-ink);color:#fff;font-size:12px}',
    /* 상품 카드 (리스트 공통) */
    P + '.pr_desc li dt{border-color:#eef0f4;border-radius:var(--wg-r);overflow:hidden;background:#f7f8fa;transition:box-shadow .3s,transform .3s}',
    P + '.pr_desc li dt img{display:block;transition:transform .5s cubic-bezier(.2,.7,.2,1)}',
    P + '.pr_desc li:hover dt{box-shadow:0 16px 32px rgba(16,24,40,.13);transform:translateY(-4px)}',
    P + '.pr_desc li:hover dt img{transform:scale(1.05)}',
    P + '.pr_desc li:hover dt:after{background-color:transparent}',
    P + '.pr_desc li dd{text-align:left;padding:0 4px}',
    P + '.pr_desc li .pcode{font-size:11px;color:#9aa1ad;letter-spacing:.2px}',
    P + '.pr_desc li .pname{height:40px;margin:4px 0 0;font-size:14px;font-weight:500;line-height:20px;color:#1f2430;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;transition:color .15s}',
    P + '.pr_desc li:hover .pname{color:var(--wg-navy)}',
    P + '.pr_desc li .price{margin:8px 0 0}',
    P + '.pr_desc li .price .mpr{font-size:18px;font-weight:800;color:#111!important;letter-spacing:-.3px}',
    P + '.pr_desc li .price .mpr span{font-size:13px;font-weight:500;margin-left:1px}',
    P + '.pr_desc li .evicBx{text-align:left}',
    /* 리스트: 타이틀/필터 */
    P + '.tit_navi a:hover{color:var(--wg-navy)}',
    P + '.stit{font-size:30px;font-weight:800;letter-spacing:-.8px;color:var(--wg-ink);margin:18px 0 26px}',
    P + '.cont_inner>img,' + P + '.cont_inner>p>img,' + P + '.cont_inner>a>img{border-radius:16px}',
    P + '.sub_tree{border:0;border-radius:var(--wg-r);background-color:var(--wg-bg);padding:14px 18px}',
    P + '.sub_tree a{color:#4b5563;transition:color .15s}',
    P + '.sub_tree a:hover{color:var(--wg-navy)}',
    P + '.sub_tree li.active a{color:var(--wg-navy);font-weight:700}',
    P + '.ct2_list{border-color:var(--wg-line);border-radius:12px;border-collapse:separate}',
    P + '.ct2_list dt{background-color:var(--wg-bg);border-radius:11px 0 0 11px;color:var(--wg-ink);font-weight:700}',
    P + '.ct2_list dd a{color:#4b5563;transition:color .15s}',
    P + '.ct2_list dd a:hover{color:var(--wg-navy)}',
    P + '.ct2_list dd a.active{color:var(--wg-navy);font-weight:700}',
    P + '.ct2_list dd a:before{background-color:var(--wg-line)}',
    P + '.cont_inner .bd.list1{border-color:var(--wg-line)!important;border-radius:12px;background-color:#fff!important;padding:4px 0}',
    P + '.cont_inner .bd.list1 .ed{height:32px;border-color:#d5dae3;border-radius:8px;padding:0 10px;font-size:13px}',
    P + '.cont_inner .bd.list1 .btn_small{padding:6px 16px;font-size:12px;background:var(--wg-navy);border-color:var(--wg-navy)}',
    P + '.tab_sort{border-color:var(--wg-ink) #fff var(--wg-line);border-top-width:2px;padding:16px 8px}',
    P + '.tab_sort .total{color:var(--wg-sub)}',
    P + '.tab_sort .total b{color:var(--wg-navy)!important;font-weight:800}',
    P + '.tab_sort ul li a{color:#9aa1ad;font-size:13px;transition:color .15s}',
    P + '.tab_sort ul li a.active{color:var(--wg-navy);font-weight:700}',
    P + '.tab_sort select{height:30px;margin-top:-15px;width:96px;border:1px solid #d5dae3;border-radius:8px;padding:0 6px;background-color:#fff}',
    /* 페이징 */
    P + '.pageing{margin-top:40px}',
    P + '.pageing a,' + P + '.pageing .wed_pagelist2,' + P + '.pageing .wed_pagelist{display:inline-block;min-width:34px;height:34px;line-height:34px;padding:0 4px;box-sizing:border-box;border-radius:10px;font-size:14px;text-align:center;text-decoration:none!important;vertical-align:middle;border:0;transition:background-color .15s,color .15s}',
    P + '.pageing a{color:#4b5563;background:transparent}',
    P + '.pageing a:hover{background-color:var(--wg-bg);color:var(--wg-navy)}',
    P + '.pageing .wed_pagelist2{background-color:var(--wg-navy);color:#fff;font-weight:700}',
    P + '.pageing img{opacity:.55;vertical-align:middle}',
    /* 상품 상세 */
    P + '.vi_img_bx .bimg{border:1px solid var(--wg-line);border-radius:18px;overflow:hidden}',
    P + '.vi_img_bx .simg_li li img{border-color:var(--wg-line);border-radius:10px;transition:border-color .15s}',
    P + '.vi_img_bx .simg_li li img:hover{border-color:var(--wg-navy)}',
    P + '.sns_share_wrap{border:0!important;padding-top:14px}',
    P + '.vi_txt_bx .tit{font-size:25px;font-weight:800;line-height:1.35;letter-spacing:-.6px;padding:4px 0 6px;border-bottom:0;color:var(--wg-ink)}',
    P + '.vi_txt_bx .tit img{vertical-align:middle;margin-top:-4px}',
    P + '.vi_txt_bx .tit_op{margin:12px 0 0;padding-bottom:18px;border-bottom:1px solid var(--wg-line)}',
    P + '.vi_txt_bx .tbl_frm01 table{border-collapse:separate;border-spacing:0;border:1px solid var(--wg-line);border-radius:12px;overflow:hidden}',
    P + '.vi_txt_bx .tbl_frm01 th,' + P + '.vi_txt_bx .tbl_frm01 td{border-color:var(--wg-line)!important;padding-top:9px;padding-bottom:9px}',
    P + '.vi_txt_bx .tbl_frm01 th{background-color:var(--wg-bg)!important;color:#4b5563;font-weight:600}',
    P + '.vi_txt_li{border-bottom-color:#eef0f4;padding:10px 0}',
    P + '.vi_txt_li dt{color:#4b5563;line-height:32px}',
    P + '.vi_txt_li select{height:34px;padding:0 8px;border:1px solid #d5dae3;border-radius:8px;background-color:#fff;font-size:13px}',
    P + '.vi_txt_li input[type=text],' + P + '.vi_txt_li input[type=number]{height:32px;border:1px solid #d5dae3;border-radius:8px;padding:0 10px;box-sizing:border-box}',
    P + '.vi_txt_li.list1{background-color:var(--wg-bg)!important;border-radius:12px;border-bottom:0;padding:14px 0;margin-top:10px}',
    P + '.vi_txt_li.list1 input[type=text]{background-color:#fff;font-weight:700}',
    P + '.vi_txt_li.list3{background-color:#f0f4ff!important;border-radius:12px;border:0!important;padding:12px 0}',
    P + '.vi_btn{margin-top:22px;table-layout:fixed}',
    P + '.vi_btn span{padding-right:8px}',
    P + '.vi_btn a.btn_medium{height:52px;line-height:50px;padding:0;font-size:15px;font-weight:700;border-radius:12px;box-sizing:border-box;text-align:center}',
    P + '.vi_rel{border:0;border-radius:18px;background-color:var(--wg-bg);padding:26px 24px 26px;margin-top:44px}',
    P + '.vi_rel .anc_tit2{font-size:19px;font-weight:800;letter-spacing:-.4px;margin:0 0 14px!important}',
    P + '.vi_rel dl dt img{border-radius:12px;background:#fff}',
    P + '.vi_rel dl .pname{font-weight:500}',
    P + '.vi_tab{height:50px;border-bottom:1px solid var(--wg-line)}',
    P + '.vi_tab li,' + P + '.vi_tab li.on{width:20%;height:50px;line-height:50px;margin:0!important;border:0;border-bottom:3px solid transparent;background-color:transparent;box-sizing:border-box;font-size:15px;color:#9aa1ad;transition:color .15s,border-color .15s}',
    P + '.vi_tab li:hover{color:var(--wg-ink)}',
    P + '.vi_tab li.on{color:var(--wg-navy);border-bottom-color:var(--wg-navy);font-weight:800}',
    P + '.tbl_frm03 table{border-collapse:separate;border-spacing:0;border:1px solid var(--wg-line);border-radius:12px;overflow:hidden}',
    P + '.tbl_frm03 th{background-color:var(--wg-bg)!important}',
    P + '.tbl_frm03 th,' + P + '.tbl_frm03 td{border-color:var(--wg-line)!important}',
    /* 메인 */
    P + '.mtit .stxt{display:inline-block;font-size:13px;font-weight:700;letter-spacing:.3px;padding:7px 14px;border-radius:999px;background-color:#eef3ff}',
    P + '.mtit .txt{font-size:32px;font-weight:800;letter-spacing:-.6px;border-bottom:0!important;margin-top:14px;display:block}',
    P + '.con_bn01 .bnr01{border-color:var(--wg-line);border-radius:18px}',
    P + '.con_bn01 .bnr02 ul li{border-color:var(--wg-line);border-radius:16px;overflow:hidden;transition:box-shadow .3s,transform .3s}',
    P + '.con_bn01 .bnr02 ul li:hover{box-shadow:var(--wg-shadow);transform:translateY(-3px)}',
    P + '.con_bn01 .bnr02 ul li img{display:block}',
    P + '.con_bn01 .slick-arrow{border-color:var(--wg-line)}',
    P + '.con_bn02 .bnr01 p{border-radius:16px}',
    P + '.con_bn02 .bnr01 p img{border-radius:16px;transition:transform .5s cubic-bezier(.2,.7,.2,1)}',
    P + '.con_bn02 .bnr01 p:hover img{transform:scale(1.04)}',
    P + '.con_bn02 .bnr02{border-radius:18px}',
    P + '.mdpick .mdp_li .pimg{border-color:var(--wg-line);border-radius:16px;overflow:hidden}',
    P + '.mdpick .mdp_li .pinfo,' + P + '.cate_pick li .pinfo{border-radius:16px;background:rgba(10,22,55,.66);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}',
    P + '.mdpick .slick-arrow{color:rgba(10,44,120,.25);transition:color .15s}',
    P + '.mdpick .slick-arrow:hover{color:var(--wg-navy)}',
    P + '.cate_pick h3{font-size:23px;font-weight:800;letter-spacing:-.5px}',
    P + '.cate_pick h3:before{border-radius:3px}',
    P + '.cate_pick li .pimg{border-color:var(--wg-line);border-radius:16px;overflow:hidden}',
    P + '.cate_pick li:first-child .pimg,' + P + '.cate_pick li:first-child .pinfo{border-radius:20px}',
    P + '.cate_pick li .pnum{font-weight:800;color:var(--wg-navy);border-bottom:2px solid var(--wg-navy)}',
    /* 리스트 상단 BEST PRODUCT */
    P + '.pg_best{background-color:var(--wg-bg);border-radius:20px;padding:30px 20px 22px}',
    P + '.pg_best h3{font-size:22px;font-weight:800;letter-spacing:-.3px;color:var(--wg-ink)}',
    P + '.pg_best dl{border-radius:16px;transition:box-shadow .3s,transform .3s}',
    P + '.pg_best dl:hover{box-shadow:0 16px 32px rgba(16,24,40,.12);transform:translateY(-4px)}',
    P + '.pg_best dl dt{margin:5px 5px 12px;border-radius:12px;overflow:hidden}',
    P + '.pg_best dl dt img{display:block}',
    P + '.pg_best dl .pcode{color:#9aa1ad}',
    P + '.pg_best dl .pname{font-size:13px;font-weight:500;color:#1f2430}',
    P + '.pg_best dl .price .mpr{font-size:17px;font-weight:800;color:#111!important;letter-spacing:-.3px}',
    P + '.pg_best dl .price .mpr span{font-weight:500}',
    /* 하단 */
    P + '.ft_allc h2{background:var(--wg-ink);border-radius:10px 10px 0 0}',
    P + '.ft_allc .ft_allc_bt{background-color:#eef0f4;color:var(--wg-sub);border-radius:0 0 10px 10px}',
    P + '.ft_allc th,' + P + '.ft_allc td{border-color:var(--wg-line)}',
    P + '.ft_cs{border-color:var(--wg-line);border-radius:14px;border-collapse:separate}',
    P + '.ft_cs dl{border-right-color:var(--wg-line)}',
    P + '.ft_cs .cs_bank .btn_bx a{border-radius:8px;transition:background-color .15s,color .15s}',
    P + '.ft_cs .cs_bank .btn_bx a:hover{background-color:var(--wg-navy)}',
    P + '.fgnb{border-radius:10px;background-color:#1c2333}',
    P + '.m_brand h2{background-color:var(--wg-navy);border-radius:12px 12px 0 0;font-weight:600}',
    P + '.m_brand .m_br_inner{border-color:var(--wg-line);border-radius:0 0 12px 12px}',
    P + '.m_brand .m_br_inner li{border-left-color:var(--wg-line)}',
    P + '.m_brand .slick-arrow{border-radius:8px}',
    /* 하단 고객서비스: 이미지 타일을 아이콘+글자 타일로 교체 (initSvcTiles) */
    P + '.cs_svc li.wg-svc{height:96px;margin-bottom:8px}',
    P + '.cs_svc li.wg-svc>img,' + P + '.cs_svc li.wg-svc>a>img{display:none}',
    P + '.cs_svc .wg-svc-t{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;width:100%;height:96px;box-sizing:border-box;border:1px solid var(--wg-line);border-radius:14px;background:#fff;color:var(--wg-navy);text-decoration:none!important;transition:transform .25s cubic-bezier(.2,.7,.2,1),box-shadow .25s,background-color .2s,border-color .2s,color .2s}',
    P + '.cs_svc .wg-svc-t svg{width:28px;height:28px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}',
    P + '.cs_svc .wg-svc-t span{font-size:13px;font-weight:600;letter-spacing:-.3px;color:#374151;transition:color .2s}',
    P + '.cs_svc .wg-svc-t{cursor:pointer}',
    P + '.cs_svc .wg-svc-t svg{transition:transform .3s cubic-bezier(.2,.7,.2,1)}',
    P + '.cs_svc .wg-svc-t:hover{border-color:transparent;background:linear-gradient(135deg,var(--wg-navy),#1d4fd8 60%,var(--wg-blue));color:#fff}',
    P + '.cs_svc .wg-svc-t:hover span{color:#fff}',
    P + '.cs_svc .wg-svc-t:hover svg{transform:translateY(-3px) scale(1.12)}',
    P + '.cs_svc .wg-svc-t:focus-visible{outline:2px solid var(--wg-blue);outline-offset:2px}',
    /* 유의사항 팝업 */
    '#wg-modal{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(7,18,45,.55);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);opacity:0;transition:opacity .25s}',
    '#wg-modal.on{opacity:1}',
    '#wg-modal .wg-md{position:relative;width:100%;max-width:440px;box-sizing:border-box;padding:34px 32px 28px;border-radius:22px;background:#fff;box-shadow:0 30px 70px rgba(7,18,45,.35);font-family:var(--wg-font);text-align:center;transform:translateY(18px) scale(.97);transition:transform .3s cubic-bezier(.2,.7,.2,1)}',
    '#wg-modal.on .wg-md{transform:none}',
    '#wg-modal .wg-md-ic{display:flex;align-items:center;justify-content:center;width:60px;height:60px;margin:0 auto 16px;border-radius:50%;background:linear-gradient(135deg,var(--wg-navy),#1d4fd8 60%,var(--wg-blue));color:#fff}',
    '#wg-modal .wg-md-ic svg{width:30px;height:30px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}',
    '#wg-modal h3{margin:0 0 14px;font-size:21px;font-weight:800;letter-spacing:-.5px;color:var(--wg-ink)}',
    '#wg-modal p{margin:0 0 10px;font-size:14.5px;line-height:1.7;color:#4b5563;word-break:keep-all}',
    '#wg-modal p b{color:var(--wg-navy);font-weight:700}',
    '#wg-modal .wg-md-note{margin-top:16px;padding:13px 14px;border-radius:12px;background:var(--wg-bg);font-size:13.5px}',
    '#wg-modal .wg-md-note a{color:var(--wg-navy);font-weight:800;text-decoration:none}',
    '#wg-modal .wg-md-ok{display:block;width:100%;height:50px;margin-top:20px;border:0;border-radius:13px;background:linear-gradient(135deg,var(--wg-navy),#1d4fd8 60%,var(--wg-blue));color:#fff;font-size:15px;font-weight:700;font-family:var(--wg-font);cursor:pointer;transition:box-shadow .2s,transform .2s}',
    '#wg-modal .wg-md-ok:hover{transform:translateY(-2px);box-shadow:0 12px 24px rgba(29,79,216,.32)}',
    '#wg-modal .wg-md-x{position:absolute;top:14px;right:14px;width:34px;height:34px;border:0;border-radius:50%;background:transparent;color:#9aa1ad;font-size:22px;line-height:34px;cursor:pointer;transition:background-color .15s,color .15s}',
    '#wg-modal .wg-md-x:hover{background:var(--wg-bg);color:var(--wg-ink)}'
  ];

  /* ---------------------------------------------------------------- 모바일 */
  var M = 'html.wg-m ';
  var mo = [
    M + 'body{background:#fff}',
    /* 헤더 */
    M + '#m_gnb{height:62px;border-bottom:0}',
    M + '#m_gnb .logo img{height:48px;margin:7px 0}',
    M + '#m_gnb .btn_sidem,' + M + '#m_gnb .btn_cart{color:var(--wg-navy)}',
    M + '#m_gnb .btn_sidem{left:16px}',
    M + '#m_gnb .btn_cart .ic_num{background-color:var(--wg-navy)}',
    M + '#hd_sch{padding:4px 14px 12px;background-color:#fff;border-bottom:1px solid var(--wg-line)}',
    M + '#header.active #hd_sch{border-bottom:0;box-shadow:0 8px 20px rgba(16,24,40,.08)}',
    M + '#hd_sch section{border:2px solid var(--wg-navy);border-radius:999px}',
    M + '#hd_sch .search_inp{width:calc(100% - 46px);height:38px;line-height:38px;padding:0 0 0 18px;font-size:15px;background:transparent;box-shadow:none!important}',
    M + '#hd_sch #sch_submit{width:46px;height:38px;font-size:18px;color:var(--wg-navy);background-color:transparent}',
    /* 인기검색어 */
    M + '.m_rkw_se{border-bottom:1px solid var(--wg-line)}',
    M + '.btn_verPC{border-radius:6px}',
    /* 카테고리 내비 */
    M + '#gnb{background:#fff!important;padding:8px 9px 4px;box-sizing:border-box;border-bottom:8px solid var(--wg-bg)}',
    M + '#gnb li{border:0!important;padding:3px;background:transparent!important}',
    M + '#gnb li a{height:36px;line-height:36px;font-size:13px;font-weight:600;letter-spacing:-.3px;color:var(--wg-ink)!important;background-color:var(--wg-bg)!important;border-radius:10px}',
    M + '#gnb li a:active{background-color:#e7ecf5!important}',
    M + '#gnb .gnb_sl select{width:100%;height:36px;margin:0 0 4px;padding:0 8px;font-size:12px;color:#4b5563;border:1px solid #d5dae3;border-radius:10px;background-color:#fff}',
    /* 메인 */
    M + '.mbm_bn01{border-top:0;padding:10px 9px 4px;background:#fff}',
    M + '.mbm_bn01 li{width:25%;border:0!important;padding:3px;box-sizing:border-box}',
    M + '.mbm_bn01 li img{display:block;border-radius:14px}',
    M + '.mbm_bn02{margin:8px 12px 0}',
    M + '.mbm_bn02 li img,' + M + '.eve_li li img{display:block;border-radius:12px}',
    M + '.eve_li ul{margin:10px 12px 0}',
    M + '.mtit{background:none;padding:0 12px}',
    M + '.mtit span{font-size:20px;font-weight:800;letter-spacing:-.5px;color:var(--wg-ink)}',
    M + '.mtit b{font-weight:800;color:var(--wg-navy)}',
    M + '.mtit2 span{font-size:20px;font-weight:800;letter-spacing:-.5px}',
    M + '.mtit2 span:before,' + M + '.mtit2 span:after{display:none}',
    /* 상품 카드 */
    M + '.pr_desc li dt,' + M + '.pr_slide dl dt,' + M + '.pg_best dl dt,' + M + '.pg_best2 dl dt{border-color:#eef0f4;border-radius:12px;overflow:hidden;background:#f7f8fa}',
    M + '.pr_desc li dt img,' + M + '.pr_slide dl dt img,' + M + '.pg_best dl dt img,' + M + '.pg_best2 dl dt img{display:block}',
    M + '.pr_slide dl:hover dt,' + M + '.pg_best dl:hover dt,' + M + '.pg_best2 dl:hover dt{border-color:#eef0f4}',
    M + '.pr_desc li dd,' + M + '.pr_slide dl dd,' + M + '.pg_best dl dd,' + M + '.pg_best2 dl dd{text-align:left;padding:0 2px}',
    M + '.pr_desc li .pcode,' + M + '.pr_slide dl .pcode,' + M + '.pg_best dl .pcode,' + M + '.pg_best2 dl .pcode{color:#9aa1ad;margin-bottom:0}',
    M + '.pr_desc li .pname,' + M + '.pr_slide dl .pname,' + M + '.pg_best dl .pname,' + M + '.pg_best2 dl .pname{height:34px;margin:3px 0 0;font-size:12.5px!important;font-weight:500;line-height:17px!important;color:#1f2430;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}',
    M + '.pr_desc li .price .mpr,' + M + '.pr_slide dl .price .mpr,' + M + '.pg_best dl .price .mpr,' + M + '.pg_best2 dl .price .mpr{font-size:15px!important;font-weight:800;color:#111!important;letter-spacing:-.3px}',
    M + '.pr_desc li .price .mpr span,' + M + '.pr_slide dl .price .mpr span,' + M + '.pg_best dl .price .mpr span,' + M + '.pg_best2 dl .price .mpr span{font-size:12px!important;font-weight:500;color:#111;margin-left:1px}',
    M + '.pr_desc li .evicBx img,' + M + '.pg_best dl .evicBx img{margin:1px 0}',
    M + '.pr_slide .slick-arrow,' + M + '.pg_best .slick-arrow,' + M + '.pg_best2 .slick-arrow{border:0;border-radius:50%;width:30px;height:30px;margin-top:-30px;background-color:#fff;box-shadow:0 4px 12px rgba(16,24,40,.18)}',
    M + '.pr_slide .slick-next,' + M + '.pg_best .slick-next,' + M + '.pg_best2 .slick-next{right:-4px}',
    M + '.pr_slide .slick-prev,' + M + '.pg_best .slick-prev,' + M + '.pg_best2 .slick-prev{left:-4px}',
    /* 리스트 */
    M + '#content_title{padding-top:26px;font-size:20px;font-weight:800;letter-spacing:-.5px;color:var(--wg-ink)}',
    M + '#content_title:after{width:24px;height:3px;border-radius:3px;margin:10px auto 22px;background-color:var(--wg-navy)}',
    M + '#sct_ct{margin:0 12px;padding:10px 14px;border-radius:14px;background-color:var(--wg-bg)}',
    M + '#sct_ct ul li a{font-size:13px;line-height:2.1;color:#4b5563;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    M + '#sct_ct ul li a.sct_here{color:var(--wg-navy);font-weight:700}',
    M + '.pg_best,' + M + '.pg_best2{background-color:var(--wg-bg);padding:22px 8px 32px;margin-top:14px}',
    M + '.pg_best h3,' + M + '.pg_best2 h3{font-size:19px;font-weight:800;letter-spacing:-.4px;color:var(--wg-ink)}',
    M + '.pg_best .ic_best{width:24px;height:24px;line-height:24px;font-size:12px;border-radius:12px 0 10px 0;background-color:var(--wg-navy)}',
    M + '.pg_best dl:first-child .ic_best{background-color:#e5382b}',
    M + '#sct_sort{border-top:2px solid var(--wg-ink);border-bottom-color:var(--wg-line)}',
    M + '#sct_sort .count strong{color:var(--wg-navy)}',
    M + '.pg_wrap{padding:6px 0 26px}',
    M + '.pageing .btn_lsmall{border-radius:10px;padding:8px 14px}',
    M + '.pageing .btn_lsmall.grey{background:var(--wg-navy);border-color:var(--wg-navy)}',
    M + '.pageing span.active{font-weight:800;color:var(--wg-navy)}',
    /* 상세 */
    M + '.sp_wrap .subject{font-size:19px;font-weight:800;line-height:1.4;letter-spacing:-.5px;color:var(--wg-ink)}',
    M + '.sp_wrap .subject .tit_op{margin-top:10px}',
    M + '.sp_wrap .sit_frm01 table{border-collapse:separate;border-spacing:0;border:1px solid var(--wg-line);border-radius:10px;overflow:hidden}',
    M + '.sp_wrap .sit_frm01 th,' + M + '.sp_wrap .sit_frm01 td{border-color:var(--wg-line)}',
    M + '.sp_wrap .sit_frm01 th{background:var(--wg-bg);color:#4b5563}',
    M + '.sp_obox{border-color:#eef0f4!important}',
    M + '.sp_obox .tlst{color:#4b5563}',
    M + '.sp_obox select,' + M + '.sel_option{height:40px;padding:0 10px;font-size:14px;border:1px solid #d5dae3;border-radius:10px;background-color:#fff}',
    M + '.sp_obox input[type=text],' + M + '.sp_obox input[type=number],' + M + '.sp_tbox input[type=text],' + M + '.sp_tbox input[type=number]{height:36px;border:1px solid #d5dae3;border-radius:10px;padding:0 10px;box-sizing:border-box;font-size:14px}',
    M + '#sit_tot_views input[type=text]{background-color:var(--wg-bg);border-color:var(--wg-bg);font-weight:700}',
    M + '.sp_btn a.btn_large{height:50px;line-height:48px;padding:0;font-size:15px;font-weight:700;border-radius:12px;box-sizing:border-box}',
    M + '.sp_tab nav li a{font-size:13px;color:#9aa1ad}',
    M + '.sp_tab nav li.active a{color:var(--wg-navy);font-weight:800}',
    /* 하단 고정바 */
    M + '.ft_navi{padding:8px 8px calc(8px + env(safe-area-inset-bottom));background:rgba(255,255,255,.94);-webkit-backdrop-filter:saturate(180%) blur(12px);backdrop-filter:saturate(180%) blur(12px);box-shadow:0 -6px 20px rgba(16,24,40,.1)}',
    M + '.ft_navi li a{height:42px;line-height:42px;font-size:14px;border-radius:12px;margin:0 3px;letter-spacing:-.4px}',
    M + '.btn_top,' + M + '.btn_bottom{width:36px;height:36px;line-height:36px;right:10px;background:rgba(255,255,255,.96);color:var(--wg-navy);box-shadow:0 4px 14px rgba(16,24,40,.2)}',
    M + '.btn_top{bottom:112px}',
    M + '.btn_bottom{bottom:70px}',
    /* 사이드 메뉴 */
    M + '#slideMenu .btn_medium{border-radius:10px}',
    M + '.ft_cs{border-top-color:var(--wg-ink)}'
  ];

  /* ============================================================ 다이나믹 레이어
   * 색 구성(네이비 그라데이션 + 옐로 포인트)과 움직임을 담당합니다.
   * THEME.dynamic = false 로 두면 이 레이어 전체가 꺼집니다. */
  var GRAD = 'linear-gradient(135deg,var(--wg-navy) 0%,#1d4fd8 60%,var(--wg-blue) 100%)';
  var EASE = 'cubic-bezier(.2,.7,.2,1)';

  var dynCommon = [
    ':root{--wg-accent:' + (THEME.accent || '#ffb800') + '}',
    '@keyframes wgUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}',
    '@keyframes wgFade{from{opacity:0}to{opacity:1}}',
    '@keyframes wgShine{from{transform:translateX(-120%) skewX(-20deg)}to{transform:translateX(320%) skewX(-20deg)}}',
    '@keyframes wgPulse{0%{box-shadow:0 0 0 0 rgba(47,107,255,.45)}100%{box-shadow:0 0 0 14px rgba(47,107,255,0)}}',
    /* 스크롤 진행 바 */
    '#wg-progress{position:fixed;top:0;left:0;height:3px;width:100%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,var(--wg-accent),var(--wg-blue));z-index:99999;pointer-events:none}',
    /* 스크롤 등장 */
    'html.wg .wg-rv{opacity:0;transform:translateY(34px) scale(.98);transition:opacity .7s ' + EASE + ',transform .7s ' + EASE + '}',
    'html.wg .wg-rv.wg-in{opacity:1;transform:none}',
    /* 주요 버튼: 그라데이션 + 빛 지나가는 효과 */
    'html.wg .wset{background:' + GRAD + ';border-color:transparent;position:relative;overflow:hidden}',
    'html.wg .wset:hover{background:' + GRAD + ';border-color:transparent;transform:translateY(-2px);box-shadow:0 12px 26px rgba(29,79,216,.38)}',
    'html.wg .wset:after{content:"";position:absolute;top:0;left:0;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.38),transparent);transform:translateX(-120%) skewX(-20deg);pointer-events:none}',
    'html.wg .wset:hover:after{animation:wgShine .9s ease}',
    'html.wg .vi_btn1:hover,html.wg .vi_btn2:hover{transform:translateY(-2px)}',
    /* 섹션 타이틀 그라데이션 글자 */
    'html.wg .mtit .txt,html.wg .mtit>span{background:' + GRAD + ';-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}',
    /* 따라다니는 구매 바 */
    '#wg-buybar{position:fixed;left:0;right:0;z-index:1990;transition:transform .45s ' + EASE + ',opacity .3s;opacity:0;pointer-events:none}',
    '#wg-buybar.on{opacity:1;pointer-events:auto;transform:none!important}',
    '#wg-buybar .wg-bb-in{display:flex;align-items:center;gap:14px;margin:0 auto;box-sizing:border-box}',
    '#wg-buybar img{width:44px;height:44px;border-radius:10px;object-fit:cover;flex:none;background:#f3f5f9}',
    '#wg-buybar .wg-bb-t{flex:1;min-width:0;font-size:15px;font-weight:700;color:var(--wg-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-.3px}',
    '#wg-buybar .wg-bb-p{flex:none;font-size:13px;color:var(--wg-sub)}',
    '#wg-buybar .wg-bb-p b{font-size:19px;font-weight:800;color:var(--wg-navy);margin:0 2px 0 6px;letter-spacing:-.4px}',
    '#wg-buybar button{flex:none;height:44px;padding:0 26px;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;font-family:var(--wg-font);transition:transform .15s,box-shadow .15s}',
    '#wg-buybar button:hover{transform:translateY(-2px)}',
    '#wg-buybar .wg-bb-cart{background:#fff;border:1.5px solid var(--wg-navy);color:var(--wg-navy)}',
    '#wg-buybar .wg-bb-buy{background:' + GRAD + ';border:0;color:#fff;box-shadow:0 8px 20px rgba(29,79,216,.32)}',
    '@media (prefers-reduced-motion:reduce){html.wg .wg-rv{opacity:1!important;transform:none!important;transition:none!important}html.wg *{animation:none!important}}'
  ];

  var dynPc = [
    /* GNB: 네이비 그라데이션 바 */
    P + '#gnb{background:linear-gradient(90deg,#071f57 0%,var(--wg-navy) 30%,#1746b8 70%,#071f57 100%);border-color:transparent!important}',
    P + '#gnb.gnd_fixed{background:linear-gradient(90deg,rgba(7,31,87,.94),rgba(23,70,184,.94),rgba(7,31,87,.94));box-shadow:0 10px 30px rgba(7,31,87,.28)}',
    P + '#gnb_inner .gnb_li>ul>li>a{color:#fff!important;font-weight:600}',
    P + '#gnb_inner .gnb_li>ul>li:hover>a{color:var(--wg-accent)!important}',
    P + '#gnb_inner .gnb_li>ul>li>a:after{background:var(--wg-accent);height:3px;bottom:0;border-radius:3px 3px 0 0}',
    P + '#gnb_inner .all_cate .allc_bt,' + P + '#gnb_inner .gnb_cart a{color:#fff!important}',
    P + '#gnb_inner .all_cate .allc_bt,' + P + '#gnb_inner .gnb_cart{border-color:rgba(255,255,255,.14)!important}',
    P + '#gnb_inner .all_cate .allc_bt:hover,' + P + '#gnb_inner .gnb_cart:hover{background-color:rgba(255,255,255,.14)}',
    P + '#gnb_inner .gnb_li>ul>li ul{border-top:3px solid var(--wg-accent);border-radius:0 0 14px 14px;animation:wgUp .25s ease both}',
    P + '#gnb_inner .gnb_li>ul>li ul a{transition:padding .2s,background-color .15s,color .15s}',
    P + '#gnb_inner .gnb_li>ul>li ul a:hover{padding-left:21px}',
    /* 검색창 */
    P + '#hd_sch .sch_frm{border-color:transparent;background:linear-gradient(#fff,#fff) padding-box,' + GRAD + ' border-box}',
    P + '#hd_sch .sch_frm .sch_submit{width:38px;height:38px;line-height:38px;top:2px;right:2px;border-radius:50%;font-size:18px;color:#fff;background:' + GRAD + ';transition:transform .2s}',
    P + '#hd_sch .sch_frm .sch_submit:hover{transform:scale(1.08) rotate(-8deg)}',
    /* 메인 */
    P + '#mbn_wrap{border-radius:0 0 44px 44px}',
    P + '#container{animation:wgFade .5s ease}',
    P + '.mtit .stxt{display:table;margin:0 auto 12px;background:var(--wg-navy);color:#fff!important;letter-spacing:.5px}',
    P + '.mtit .txt{margin-top:0}',
    P + '.mtit .txt{font-size:36px;letter-spacing:-1px;position:relative;display:inline-block!important;padding-bottom:16px}',
    P + '.mtit .txt:after{content:"";position:absolute;left:50%;bottom:0;width:44px;height:5px;margin-left:-22px;border-radius:5px;background:var(--wg-accent);transition:width .5s ' + EASE + ',margin-left .5s ' + EASE + '}',
    P + '.mtit.wg-in .txt:after,' + P + '.mtit:hover .txt:after{width:100%;margin-left:-50%}',
    P + '.con_bn01 .bnr02 ul li img,' + P + '.con_bn01 .bnr01 img{transition:transform .6s ' + EASE + '}',
    P + '.con_bn01 .bnr02 ul li:hover img{transform:scale(1.06)}',
    P + '.con_bn02 .bnr01 p{position:relative;overflow:hidden}',
    P + '.mdpick .mdp_li{transition:transform .35s ' + EASE + '}',
    P + '.mdpick .mdp_li:hover{transform:translateY(-8px)}',
    P + '.mdpick .mdp_li .pimg{transition:box-shadow .35s}',
    P + '.mdpick .mdp_li:hover .pimg{box-shadow:0 22px 40px rgba(7,31,87,.22)}',
    P + '.mdpick .mdp_li .pinfo,' + P + '.cate_pick li .pinfo{background:linear-gradient(180deg,rgba(7,31,87,.2) 0%,rgba(7,31,87,.88) 100%);-webkit-backdrop-filter:none;backdrop-filter:none}',
    P + '.mdpick .mdp_li .pinfo dl,' + P + '.cate_pick li .pinfo dl{vertical-align:bottom;transform:translateY(14px);transition:transform .35s ' + EASE + '}',
    P + '.mdpick .mdp_li:hover .pinfo dl,' + P + '.cate_pick li:hover .pinfo dl{transform:none}',
    P + '.cate_pick li .pimg img{transition:transform .6s ' + EASE + '}',
    P + '.cate_pick li:hover .pimg img{transform:scale(1.07)}',
    P + '.cate_pick li .pnum{left:10px;top:10px;width:30px;height:30px;line-height:30px;padding:0;border:0;border-radius:50%;background:' + GRAD + ';color:#fff;font-size:13px;z-index:30;box-shadow:0 6px 14px rgba(7,31,87,.3)}',
    P + '.cate_pick h3{font-size:26px}',
    P + '.cate_pick h3:before{background:var(--wg-accent)!important;width:6px}',
    /* 상품 카드: 떠오르는 카드 + 호버 액션 */
    P + '.pr_desc li a{border-radius:18px;padding-bottom:14px;transition:background-color .3s,box-shadow .3s,transform .35s ' + EASE + '}',
    P + '.pr_desc li:hover a{background-color:#fff;box-shadow:0 20px 44px rgba(7,31,87,.16);transform:translateY(-8px)}',
    P + '.pr_desc li:hover dt{box-shadow:none;transform:none}',
    P + '.pr_desc li dd{padding:0 10px}',
    P + '.pr_desc li dt:before{content:"자세히 보기  →";position:absolute;left:50%;bottom:14px;z-index:12;white-space:pre;padding:9px 18px;border-radius:999px;font-size:12px;font-weight:700;color:#fff;background:' + GRAD + ';box-shadow:0 8px 18px rgba(7,31,87,.35);opacity:0;transform:translate(-50%,16px);transition:opacity .3s,transform .35s ' + EASE + '}',
    P + '.pr_desc li:hover dt:before{opacity:1;transform:translate(-50%,0)}',
    P + '.pr_desc li:hover dt img{transform:scale(1.08)}',
    P + '.pr_desc li .price .mpr{color:var(--wg-navy)!important;font-size:19px}',
    P + '.pg_best dl:hover{transform:translateY(-8px);box-shadow:0 20px 44px rgba(7,31,87,.16)}',
    P + '.pg_best dl dt img{transition:transform .6s ' + EASE + '}',
    P + '.pg_best dl:hover dt img{transform:scale(1.07)}',
    P + '.pg_best dl .price .mpr{color:var(--wg-navy)!important}',
    /* 리스트: 카테고리 칩 */
    P + '.stit{font-size:36px;letter-spacing:-1.2px;background:' + GRAD + ';-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}',
    P + '.sub_tree{background:transparent;padding:0;text-align:center;overflow:visible}',
    P + '.sub_tree:after{content:"";display:block;clear:both}',
    P + '.sub_tree li{width:auto!important;padding:4px;float:none;display:inline-block}',
    P + '.sub_tree a{display:block;padding:9px 18px;border-radius:999px;border:1px solid #dfe4ee;background:#fff;color:#374151;font-weight:500;transition:all .25s ' + EASE + '}',
    P + '.sub_tree a:hover{border-color:var(--wg-navy);color:var(--wg-navy);transform:translateY(-3px);box-shadow:0 8px 18px rgba(7,31,87,.14)}',
    P + '.sub_tree li.active a{background:' + GRAD + ';border-color:transparent;color:#fff;font-weight:700;box-shadow:0 8px 18px rgba(29,79,216,.3)}',
    P + '.tab_sort{position:sticky;top:48px;z-index:60;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-top:0;height:auto;padding:12px 8px;line-height:28px}',
    P + '.tab_sort .total,' + P + '.tab_sort ul{height:auto}',
    P + '.tab_sort ul li a{padding:0 14px;border-radius:999px;line-height:28px;transition:all .2s}',
    P + '.tab_sort ul li a:hover{background:var(--wg-bg);color:var(--wg-navy)}',
    P + '.tab_sort ul li a.active{background:var(--wg-navy);color:#fff}',
    P + '.pageing a:hover{transform:translateY(-2px)}',
    P + '.pageing .wed_pagelist2{background:' + GRAD + ';box-shadow:0 8px 16px rgba(29,79,216,.3)}',
    /* 상세 */
    P + '.vi_img_bx .bimg{cursor:zoom-in;box-shadow:0 20px 44px rgba(7,31,87,.1)}',
    P + '.vi_img_bx .bimg img{transition:transform .35s ' + EASE + ';display:block}',
    P + '.vi_img_bx .bimg.wg-zoom img{transform:scale(2)}',
    P + '.vi_txt_bx .tit{font-size:28px}',
    P + '.vi_txt_li.list1{background:linear-gradient(135deg,#f3f6fd,#eaf0ff)!important}',
    P + '.vi_btn a.btn_medium{height:56px;line-height:54px;font-size:16px}',
    P + '.vi_btn a.wset{line-height:56px}',
    P + '.vi_tab li{position:relative}',
    P + '.vi_tab li:after{content:"";position:absolute;left:50%;right:50%;bottom:0;height:3px;background:var(--wg-accent);transition:left .3s,right .3s}',
    P + '.vi_tab li:hover:after{left:20%;right:20%}',
    P + '.vi_tab li.on{border-bottom-color:transparent}',
    P + '.vi_tab li.on:after{left:0;right:0;background:' + GRAD + '}',
    P + '.vi_rel dl{transition:transform .35s ' + EASE + '}',
    P + '.vi_rel dl:hover{transform:translateY(-6px)}',
    P + '#wg-buybar{top:48px;transform:translateY(-110%);background:rgba(255,255,255,.95);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:0 10px 30px rgba(7,31,87,.14)}',
    P + '#wg-buybar .wg-bb-in{width:1260px;padding:10px 0}',
    /* 그림자·떠오름이 부모 박스에서 잘리지 않게: 자르는 대신 float 만 감싸도록 변경 */
    P + '.pr_desc,' + P + '.pg_best,' + P + '.con_bn01,' + P + '.con_bn02,' + P + '.cont_wrap,' + P + '.company,' + P + '#ft{overflow:visible;display:flow-root}',
    P + '.pr_desc ul,' + P + '.company ul,' + P + '.con_bn01 .bnr02 ul{overflow:visible;display:flow-root}',
    P + '.pr_desc li,' + P + '.company li{overflow:visible}',
    P + '.con_bn01 .bnr02,' + P + '.vi_info,' + P + '.vi_img_bx,' + P + '.vi_txt_bx{overflow:visible}',
    P + '.mdpick .slick-list{padding:20px 0 48px!important;margin:-20px 0 -48px}',
    P + '.vi_rel .swiper{padding:10px 0 0;margin-top:-10px}',
    /* 우측 퀵메뉴 */
    P + '#qcr .qcrM li{transition:transform .2s}',
    P + '#qcr .qcrM li:hover{transform:translateX(-4px)}',
    P + '#qcr .qcrM li:hover .ionicons{color:#fff;background:var(--wg-navy)}'
  ];

  var dynMo = [
    M + '#container{animation:wgFade .45s ease}',
    M + '#hd_sch section{border-color:transparent;background:linear-gradient(#fff,#fff) padding-box,' + GRAD + ' border-box}',
    M + '#hd_sch #sch_submit{width:34px;height:34px;margin:2px;border-radius:50%;color:#fff;background:' + GRAD + ';font-size:15px;padding:0}',
    M + '#hd_sch .search_inp{width:calc(100% - 40px)}',
    M + '#m_gnb .btn_cart .ic_num{background:var(--wg-accent);color:#111;font-weight:700}',
    /* 카테고리 칩 */
    M + '#gnb ul{display:flex;flex-wrap:wrap;justify-content:center}',
    M + '#gnb li{width:auto;float:none;flex:0 0 auto;clear:none!important}',
    M + '#gnb li a{padding:0 15px;border:1px solid #dfe4ee;background-color:#fff!important;border-radius:999px;color:var(--wg-navy)!important;transition:transform .15s,background-color .15s}',
    M + '#gnb li a:active{transform:scale(.94);background-color:#eef3ff!important}',
    M + '#gnb ul:before{content:"";flex:0 0 100%;order:1}',
    M + '#gnb li.gnb_sl{flex:0 0 33.333%;order:2;box-sizing:border-box;padding-top:6px}',
    'html.wg-m.wg-view .btn_top{bottom:176px}',
    'html.wg-m.wg-view .btn_bottom{bottom:134px}',
    /* 메인 */
    M + '.mbm_bn01 li img{transition:transform .2s}',
    M + '.mbm_bn01 li:active img{transform:scale(.93)}',
    M + '.mtit{margin-bottom:4px}',
    M + '.mtit span{font-size:22px;padding-bottom:10px;position:relative}',
    M + '.mtit span:after{content:"";position:absolute;left:50%;bottom:0;width:28px;height:4px;margin-left:-14px;border-radius:4px;background:var(--wg-accent)}',
    M + '.mtit b{-webkit-text-fill-color:var(--wg-blue)}',
    /* 리스트: 2열 큰 카드 */
    M + '.pr_desc.wli3 li{width:48.5%;margin:0 0 22px 3%!important;clear:none!important}',
    M + '.pr_desc.wli3 li:nth-child(2n+1){margin-left:0!important;clear:both!important}',
    M + '.pr_desc.wli3 li dt{border-radius:16px}',
    M + '.pr_desc.wli3 li .pname{height:38px;font-size:13.5px!important;line-height:19px!important;margin-top:5px}',
    M + '.pr_desc.wli3 li .price .mpr{font-size:17px!important;color:var(--wg-navy)!important}',
    M + '.pr_desc li a{transition:transform .2s}',
    M + '.pr_desc li a:active{transform:scale(.97)}',
    M + '.pr_slide dl .price .mpr,' + M + '.pg_best dl .price .mpr,' + M + '.pg_best2 dl .price .mpr{color:var(--wg-navy)!important}',
    M + '#content_title{font-size:24px;letter-spacing:-.8px}',
    M + '#content_title span{background:' + GRAD + ';-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}',
    M + '#content_title:after{background-color:var(--wg-accent);width:28px;height:4px}',
    M + '#sct_ct{background:transparent;padding:0 8px;margin:0 4px 6px}',
    M + '#sct_ct ul{display:flex;flex-wrap:wrap;justify-content:center}',
    M + '#sct_ct li{width:auto;float:none;padding:3px}',
    M + '#sct_ct ul li a{padding:0 13px;line-height:32px;border:1px solid #dfe4ee;border-radius:999px;background:#fff;color:#374151}',
    M + '#sct_ct ul li a.sct_here{background:' + GRAD + ';border-color:transparent;color:#fff}',
    M + '.pg_best .ic_best{background:' + GRAD + '}',
    M + '.pageing .btn_lsmall.grey{background:' + GRAD + ';border-color:transparent}',
    /* 상세 */
    M + '.sp_wrap .subject{font-size:21px}',
    M + '.sp_btn a.btn_large{height:54px;line-height:52px;font-size:16px}',
    M + '.sp_btn a.wset{line-height:54px}',
    M + '.sp_tab nav li{position:relative}',
    M + '.sp_tab nav li.active:after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:' + GRAD + '}',
    M + '#wg-buybar{bottom:calc(58px + env(safe-area-inset-bottom));transform:translateY(140%);z-index:7990;padding:0 10px 8px}',
    M + '#wg-buybar .wg-bb-in{gap:8px;padding:8px;border-radius:18px;background:rgba(255,255,255,.96);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:0 10px 30px rgba(7,31,87,.24)}',
    M + '#wg-buybar img,' + M + '#wg-buybar .wg-bb-t{display:none}',
    M + '#wg-buybar .wg-bb-p{flex:1;min-width:0;padding-left:6px;white-space:nowrap;overflow:hidden;font-size:11px}',
    M + '#wg-buybar .wg-bb-p b{font-size:16px;margin-left:3px}',
    M + '#wg-buybar button{height:44px;padding:0 16px;font-size:14px}',
    /* 하단 바 */
    M + '.ft_navi li a{transition:transform .15s}',
    M + '.ft_navi li a:active{transform:scale(.95)}',
    M + '.btn_top,' + M + '.btn_bottom{transition:transform .2s}',
    M + '.btn_top:active,' + M + '.btn_bottom:active{transform:scale(.9)}'
  ];

  /* PC·모바일 공통으로 쓰는 SNS 링크 스타일 */
  common = common.concat([
    'html.wg .wg-sns{display:flex;gap:8px;margin-top:14px;padding:2px 0 4px}',
    'html.wg .wg-sns-a{display:inline-flex;align-items:center;gap:7px;text-decoration:none!important;transition:background .2s,color .2s,border-color .2s,transform .2s,box-shadow .2s}',
    'html.wg .wg-sns-a svg{width:18px;height:18px;flex:none;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}',
    'html.wg .wg-sns .wg-sns-a{height:36px;padding:0 15px 0 12px;border:1px solid #dfe4ee;border-radius:999px;background:#fff;color:#374151;font-size:13px;font-weight:600;letter-spacing:-.3px}',
    'html.wg .wg-sns .wg-sns-a:hover{color:#fff;border-color:transparent;transform:translateY(-2px)}',
    'html.wg .wg-sns-insta:hover{background:linear-gradient(45deg,#f58529,#dd2a7b 55%,#8134af);box-shadow:0 8px 18px rgba(221,42,123,.3)}',
    'html.wg .wg-sns-blog:hover{background:#03c75a;box-shadow:0 8px 18px rgba(3,199,90,.3)}',
    M + '.wg-sns{justify-content:center;margin:0;padding:16px 0 4px}',
    P + '#tnb_inner .tnb_ul li.wg-sns-top{padding:0 0 0 12px;height:38px;display:flex;align-items:center;gap:6px}',
    P + '#tnb_inner .tnb_ul li.wg-sns-top a{display:flex;align-items:center;width:26px;height:26px;padding:0;line-height:1;justify-content:center;border-radius:50%;background:#eef1f6;color:#5b6475}',
    P + '#tnb_inner .tnb_ul li.wg-sns-top a svg{width:15px;height:15px}',
    P + '#tnb_inner .tnb_ul li.wg-sns-top a:hover{color:#fff;transform:translateY(-1px)}'
  ]);

  if (THEME.dynamic !== false) {
    common = common.concat(dynCommon);
    pc = pc.concat(dynPc);
    mo = mo.concat(dynMo);
  }

  /* ----------------------------------------------------------------- 동작 */
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  function initProgress() {
    var bar = doc.createElement('div');
    bar.id = 'wg-progress';
    doc.body.appendChild(bar);
    var tick = false;
    function upd() {
      tick = false;
      var max = root.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, (window.pageYOffset || 0) / max) : 0) + ')';
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  /* 화면 아래쪽에 있는 요소만 숨겼다가 스크롤로 보일 때 등장시킵니다. */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    var sel = isMobile
      ? '.pr_desc li,.mtit,.mtit2,.mbm_bn01 li,.mbm_bn02 li,.eve_li li,.pr_slide,.pg_best,.pg_best2'
      : '.pr_desc li,.pg_best dl,.mtit,.con_bn01,.con_bn02,.mdpick,.cate_pick,.vi_rel,.m_brand,.ft_cs';
    var vh = window.innerHeight, vw = window.innerWidth || 1;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.className += ' wg-in';
        io.unobserve(el);
        setTimeout(function () { el.style.transitionDelay = ''; }, 900);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    $all(sel).forEach(function (el) {
      if (el.parentNode && el.parentNode.closest && el.parentNode.closest('.slick-slider,.slick-track,.swiper')) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 || (!r.width && !r.height)) return; // 이미 보이는 건 그대로 둠
      el.style.transitionDelay = Math.round(Math.max(0, r.left) / vw * 320) + 'ms';
      el.className += ' wg-rv';
      io.observe(el);
    });
  }

  /* PC 상세: 이미지에 마우스를 올리면 그 위치를 확대 */
  function initZoom() {
    var box = doc.querySelector('.vi_img_bx .bimg');
    var img = box && box.querySelector('img');
    if (!img) return;
    box.addEventListener('mousemove', function (e) {
      var r = box.getBoundingClientRect();
      img.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%';
      if (box.className.indexOf('wg-zoom') < 0) box.className += ' wg-zoom';
    });
    box.addEventListener('mouseleave', function () { box.className = box.className.replace(/\s*wg-zoom/g, ''); });
  }

  /* 상세: 구매 버튼이 화면 밖으로 나가면 따라다니는 구매 바 표시 (원래 버튼을 대신 눌러줌) */
  function initBuyBar() {
    var wrap = doc.querySelector(isMobile ? '.sp_btn' : '.vi_btn');
    if (!wrap) return;
    var buy = wrap.querySelector('a.wset'), cart = wrap.querySelector('a.vi_btn1');
    if (!buy) return;
    var titEl = doc.querySelector(isMobile ? '.sp_wrap .subject' : '.vi_txt_bx .tit');
    var title = '';
    if (titEl) {
      for (var n = titEl.firstChild; n; n = n.nextSibling) if (n.nodeType === 3) title += n.nodeValue;
      title = title.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
    }
    var thumb = doc.querySelector(isMobile ? '.sp_wrap img' : '.vi_img_bx .bimg img');
    var bar = doc.createElement('div');
    bar.id = 'wg-buybar';
    var inner = doc.createElement('div');
    inner.className = 'wg-bb-in';
    if (thumb && thumb.src) { var im = doc.createElement('img'); im.src = thumb.src; im.alt = ''; inner.appendChild(im); }
    var t = doc.createElement('div'); t.className = 'wg-bb-t'; t.appendChild(doc.createTextNode(title)); inner.appendChild(t);
    var p = doc.createElement('div'); p.className = 'wg-bb-p'; inner.appendChild(p);
    function btn(cls, label, target) {
      if (!target) return;
      var b = doc.createElement('button');
      b.type = 'button'; b.className = cls; b.appendChild(doc.createTextNode(label));
      b.addEventListener('click', function () { target.click(); });
      inner.appendChild(b);
    }
    btn('wg-bb-cart', '장바구니', cart);
    btn('wg-bb-buy', '바로구매', buy);
    bar.appendChild(inner);
    doc.body.appendChild(bar);

    var amt = doc.getElementById('sit_amt'), last = null;
    function price() {
      var v = amt ? String(amt.value || '').replace(/^\s+|\s+$/g, '') : '';
      if (v === last) return;
      last = v;
      p.innerHTML = '';
      if (v && v !== '0') {
        p.appendChild(doc.createTextNode('총 합계'));
        var b = doc.createElement('b'); b.appendChild(doc.createTextNode(v)); p.appendChild(b);
        p.appendChild(doc.createTextNode('원'));
      }
    }
    var tick = false;
    function upd() {
      tick = false;
      var r = wrap.getBoundingClientRect();
      var show = isMobile ? (r.bottom < 0 || r.top > window.innerHeight) : r.bottom < 60;
      if (show) price();
      var on = bar.className.indexOf('on') >= 0;
      if (show !== on) bar.className = show ? 'on' : '';
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  /* 유의사항 팝업. 문구는 아래 NOTICE 만 고치면 됩니다. */
  var NOTICE = {
    title: '견적 요청 시 유의사항',
    lines: [
      '위고기프트는 <b>조금이라도 더 좋은 가격</b>을 드리기 위해 생산업체와 단가를 직접 조율하며, 견적 요청을 순차적으로 처리하고 있습니다.',
      '이 과정 때문에 <b>견적 회신이 다소 늦어질 수 있는 점</b> 너그러이 양해 부탁드립니다.'
    ],
    note: '급하신 경우 <a href="tel:010-2849-5945">010-2849-5945</a> 또는 카카오톡으로 연락 주시면 먼저 안내해 드리겠습니다.'
  };
  /* 마침표 뒤에 문장이 이어지면 줄을 바꿉니다. */
  function brk(t) { return t.replace(/([.!?])\s+(?=[^\s<])/g, '$1<br>'); }

  /* SNS 링크: PC 는 상단 유틸바 + 하단 회사정보, 모바일은 하단 메뉴 아래 */
  var SNS = [
    { key: 'insta', label: '인스타그램', url: 'https://www.instagram.com/wego.gift/',
      icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/>' },
    { key: 'blog', label: '블로그', url: 'https://blog.naver.com/wegogift',
      icon: '<path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5l-2 3-2-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM7.5 9h9M7.5 12.5h5.5"/>' }
  ];
  function snsLink(s, withLabel) {
    var a = doc.createElement('a');
    a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
    a.className = 'wg-sns-a wg-sns-' + s.key;
    a.title = '위고기프트 ' + s.label;
    a.setAttribute('aria-label', '위고기프트 ' + s.label);
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + s.icon + '</svg>';
    if (withLabel) { var sp = doc.createElement('span'); sp.appendChild(doc.createTextNode(s.label)); a.appendChild(sp); }
    return a;
  }
  function initSns() {
    if (doc.querySelector('.wg-sns')) return;
    var row = doc.createElement('div');
    row.className = 'wg-sns';
    SNS.forEach(function (s) { row.appendChild(snsLink(s, true)); });
    if (isMobile) {
      var menu = doc.querySelector('#ft .ft_menu');
      if (menu && menu.parentNode) menu.parentNode.insertBefore(row, menu.nextSibling);
      return;
    }
    var co = doc.querySelector('#ft .company li');
    if (co) co.appendChild(row);
    var top = doc.querySelector('#tnb_inner .tnb_ul');
    if (top) {
      var li = doc.createElement('li');
      li.className = 'wg-sns-top';
      SNS.forEach(function (s) { li.appendChild(snsLink(s, false)); });
      top.appendChild(li);
    }
  }
  function openNotice() {
    if (doc.getElementById('wg-modal')) return;
    var prev = doc.activeElement;
    var m = doc.createElement('div');
    m.id = 'wg-modal';
    m.setAttribute('role', 'dialog');
    m.setAttribute('aria-modal', 'true');
    m.innerHTML = '<div class="wg-md"><button type="button" class="wg-md-x" aria-label="닫기">&times;</button>' +
      '<div class="wg-md-ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l10 18H2zM12 10v5M12 18v.01"/></svg></div>' +
      '<h3>' + NOTICE.title + '</h3>' +
      NOTICE.lines.map(function (t) { return '<p>' + brk(t) + '</p>'; }).join('') +
      '<p class="wg-md-note">' + brk(NOTICE.note) + '</p>' +
      '<button type="button" class="wg-md-ok">확인</button></div>';
    function close() {
      doc.removeEventListener('keydown', onKey);
      m.className = '';
      setTimeout(function () { if (m.parentNode) m.parentNode.removeChild(m); }, 260);
      if (prev && prev.focus) { try { prev.focus(); } catch (e) {} }
    }
    function onKey(e) { if (e.key === 'Escape' || e.key === 'Esc') close(); }
    m.addEventListener('click', function (e) {
      var c = e.target.className || '';
      if (e.target === m || c === 'wg-md-x' || c === 'wg-md-ok') close();
    });
    doc.addEventListener('keydown', onKey);
    doc.body.appendChild(m);
    requestAnimationFrame(function () { requestAnimationFrame(function () { m.className = 'on'; }); });
    var ok = m.querySelector('.wg-md-ok');
    if (ok) ok.focus();
  }

  /* PC 하단 고객서비스: 링크 주소로 항목을 알아내 아이콘 타일로 바꿉니다.
   * 모르는 항목은 원래 이미지를 그대로 둡니다. */
  function initSvcTiles() {
    var I = {
      join: '<circle cx="9" cy="8" r="4"/><path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7M19 8v6M16 11h6"/>',
      edit: '<circle cx="9" cy="8" r="4"/><path d="M2 21c0-3.9 3.1-7 7-7 1 0 2 .2 2.9 .6M14.5 20.5l.8-3.3 5.2-5.2 2.5 2.5-5.2 5.2z"/>',
      notice: '<path d="M3 10v4h3l6 4V6L6 10H3zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',
      qna: '<path d="M4 5h16v11H9l-5 4zM8.5 9.5h7M8.5 12.5h4"/>',
      faq: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 5 0c0 1.7-2.5 2-2.5 4M12 17v.01"/>',
      note: '<path d="M12 3l10 18H2zM12 10v5M12 18v.01"/>'
    };
    var MAP = [
      [/register_mod/, 'edit', '정보변경'],
      [/register\.php/, 'join', '회원가입'],
      [/boardid=13/, 'notice', '공지사항'],
      [/qna_list/, 'qna', 'Q&A'],
      [/faq/, 'faq', 'FAQ']
    ];
    $all('.ft_cs .cs_svc ul li').forEach(function (li) {
      if (li.className.indexOf('wg-svc') >= 0) return;
      var a = li.querySelector('a'), hit = null;
      if (a) {
        var href = a.getAttribute('href') || '';
        for (var i = 0; i < MAP.length; i++) if (MAP[i][0].test(href)) { hit = MAP[i]; break; }
        if (!hit) return;
      } else {
        hit = [null, 'note', '유의사항'];
      }
      var box = a || doc.createElement('div');
      var svg = '<svg viewBox="0 0 24 24" aria-hidden="true">' + I[hit[1]] + '</svg>';
      var wrap = doc.createElement('span');
      wrap.style.display = 'contents';
      wrap.innerHTML = svg + '<span></span>';
      wrap.lastChild.appendChild(doc.createTextNode(hit[2]));
      while (wrap.firstChild) box.appendChild(wrap.firstChild);
      box.className += ' wg-svc-t';
      if (!a) {
        box.setAttribute('role', 'button');
        box.setAttribute('tabindex', '0');
        box.addEventListener('click', openNotice);
        box.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openNotice(); }
        });
        li.appendChild(box);
      }
      li.className += ' wg-svc';
    });
  }

  function enhance() {
    if (!doc.body) return;
    if (!isMobile) { try { initSvcTiles(); } catch (e) {} }
    try { initSns(); } catch (e) {}
    if (THEME.dynamic === false) return;
    try { initProgress(); } catch (e) {}
    try { initReveal(); } catch (e) {}
    if (page === 'view') {
      if (!isMobile) { try { initZoom(); } catch (e) {} }
      try { initBuyBar(); } catch (e) {}
    }
  }
  /* 사이트 자체 슬라이더(slick) 초기화가 끝난 뒤에 실행 */
  function whenReady(fn) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { setTimeout(fn, 60); });
    else setTimeout(fn, 60);
  }
  whenReady(enhance);

  /* ------------------------------------------------------------- 스타일 주입 */
  function inject() {
    if (doc.getElementById('wego-ui-style')) return;
    var head = doc.head || doc.getElementsByTagName('head')[0] || root;
    if (THEME.webfont) {
      var link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';
      head.appendChild(link);
    }
    var style = doc.createElement('style');
    style.id = 'wego-ui-style';
    style.appendChild(doc.createTextNode(common.concat(isMobile ? mo : pc).join('\n')));
    head.appendChild(style);
  }
  inject();

  /* 테마 CSS 가 뒤늦게 로드돼도 우선순위를 잃지 않도록 head 맨 끝으로 재배치 */
  function keepLast() {
    var s = doc.getElementById('wego-ui-style');
    if (s && s.parentNode && s.parentNode.lastChild !== s) s.parentNode.appendChild(s);
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', keepLast);
  else keepLast();
  window.addEventListener('load', keepLast);
})();
