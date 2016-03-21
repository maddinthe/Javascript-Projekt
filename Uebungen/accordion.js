"use strict";

<script src="/jquery.min.js" type="text/javascript"></script>
…
<script type="text/javascript">
    $('#drawers').find('h5').click(function(){
        $(this).next().slideToggle();
        $("#drawers div").not($(this).next()).slideUp();
    });
</script>