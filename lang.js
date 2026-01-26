$(function () {
    function setLanguage(lang) {

        // update UI strings
        $('*[data-lang]').each(function () {
            if ($(this).data('lang-en') === undefined) {
                $(this).attr('data-lang-en', $(this).text()); // backup the default text
            }
            const enText = $(this).data('lang-en');
            const langText = $(this).data(`lang-${lang}`);
            $(this).text(langText || enText);
        });

        // active button state
        $('.lang-btn').removeClass('active');
        $(`.lang-btn[data-lang-key="${lang}"]`).addClass('active');

        // persist
        window.lang = lang;
        try { localStorage.setItem('guessit_lang', lang); } catch (e) { }
    }

    // wire toggle buttons
    $('.lang-btn').on('click', function () {
        const lang = $(this).data('lang-key');
        setLanguage(lang);
    });

    $(document).on('langChange', function (e) {
        const currentLang = window.lang;
        const $label = $(e.target);
        const enText = $label.data('lang-en');
        const langText = $label.data(`lang-${currentLang}`);
        $label.text(langText || enText);
    });

    // initialize language from storage or existing document language
    const initialLang = (function () {
        try { return localStorage.getItem('guessit_lang') || $('html').attr('lang') || 'en'; } catch (e) { return $('html').attr('lang') || 'en'; }
    })();
    setLanguage(initialLang);
});