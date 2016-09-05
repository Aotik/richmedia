<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css">
    <link rel="stylesheet" href="css/rm.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,300,500,700">
    <script src="//code.jquery.com/jquery-2.2.1.min.js"></script>
    <script src="ele.js"></script>
  </head>
  <body>
    <div class="wrapper">
      <nav>
        <div class="title">
          <h3>Richie</h3>
        </div><span id="msg"></span>
        <ul class="xnav">
          <li><a class="nav-cta append-rm">Add</a></li>
          <li><a class="nav-cta copy-rm">Copy All</a></li>
          <li> <a class="nav-cta copy-html">Copy HTML</a></li>
        </ul>
      </nav>
      <div class="col-left">
        <div class="c-field">
          <input type="text" class="c-header">
          <label>Content Header</label>
        </div>
        <div class="c-field">
          <input type="text" class="c-img">
          <label>Image Link</label>
        </div>
        <div class="c-field">
          <input type="text" class="c-alt">
          <label>Image Alt Tag</label>
        </div>
        <div class="c-field">
          <input id="txt-styling" type="text">
        </div>
        <div class="c-field t-full">
          <textarea class="c-body"></textarea>
          <label>Content</label>
        </div>
      </div>
      <div class="col-right">
        <pre><span class="preview-d">Output</span><span class="save-rm">save</span><span class="undo-rm"><i class="icon ion-reply"></i></span><code id="output" contenteditable="true" spellcheck="false" class="output"></code></pre>
        <div class="preview-co"><span class="de">Preview</span>
          <div class="preview"></div>
        </div>
      </div>
    </div>
  </body>
</html>