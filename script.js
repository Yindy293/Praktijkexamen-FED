$(document).ready(function() {
    function loadBlogArticles() {
        $.ajax({
            url: 'blogdata.html',
            method: 'GET',
            success: function(data) {
                $('#blog-articles').hide().empty().append($(data).find('article')).fadeIn('slow');
                setupBlogLinks();
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    function setupBlogLinks() {
        $('#blog-articles').on('click', 'article', function() {
            let articleId = $(this).attr('id');
            showArticleDetail(articleId);
        });
    }

    function showArticleDetail(articleId) {
        $.ajax({
            url: 'blogdata.html',
            method: 'GET',
            success: function(data) {
                let articleContent = $(data).find('#' + articleId).html();
                $('#blog-articles').html('<article>' + articleContent + '</article>');
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    loadBlogArticles();

    $('#blog-form').validate();

    $('#date').datepicker();

    $('#blog-form').submit(function(e) {
        e.preventDefault();
        if ($(this).valid()) {
            let title = $('#title').val();
            let content = $('#content').val();
            let date = $('#date').val();
            let newArticleId = 'article-' + ($('#blog-articles').children().length + 1);
            let newArticle = '<article id="' + newArticleId + '">' +
                                '<h2>' + title + '</h2>' +
                                '<p>' + content + '</p>' +
                                '<p><strong>Date:</strong> ' + date + '</p>' +
                              '</article>';
            $('#blog-articles').append(newArticle);
            $('#title').val('');
            $('#content').val('');
            $('#date').val('');
            alert('Blogartikel toegevoegd:\nTitel: ' + title + '\nInhoud: ' + content + '\nDatum: ' + date);
        }
    });
});
