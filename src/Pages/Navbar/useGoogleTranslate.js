// import { useEffect } from 'react';

// const useGoogleTranslate = () => {
//   useEffect(() => {
//     const addGoogleTranslateScript = () => {
//       const script = document.createElement('script');
//       script.type = 'text/javascript'; script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//       script.async = true;
//       script.defer = true;

//       script.onload = () => {
//         if (typeof window.google !== 'undefined' && window.google.translate) {
//           new window.google.translate.TranslateElement({
//             pageLanguage: 'en',
//             includedLanguages: 'en,fr,es,de,zh-CN,zh-TW,ja,ko,ar',
//             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           }, 'google_translate_element');
//         }
//       };

//       document.body.appendChild(script);
//     };

//     if (!window.googleTranslateElementInit) {
//       window.googleTranslateElementInit = () => {
//         if (typeof window.google !== 'undefined' && window.google.translate) {
//           new window.google.translate.TranslateElement({
//             pageLanguage: 'en',
//             includedLanguages: 'en,fr,es,de,zh-CN,zh-TW,ja,ko,ar',
//             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           }, 'google_translate_element');
//         }
//       };
//       addGoogleTranslateScript();
//     } else {
//       window.googleTranslateElementInit();
//     }
//   }, []);
// };

// export default useGoogleTranslate;
