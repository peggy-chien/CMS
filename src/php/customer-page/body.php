<?php
  // include your navbar here
?>

<style type="text/css">
  body, html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .row-container {
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: hidden;
  }
  .grow-iframe {
    flex-grow: 1;
    border: none;
    margin: 0;
    padding: 0;
  }
</style>
<div class="row-container">
  <iframe src="http://127.0.0.1:5500/src/app/index.html" class="grow-iframe"></iframe>
</div>