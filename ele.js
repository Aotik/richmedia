$(function() {
	var counter = 0;
	var undoH, undoL, undoC, undoA;
	$('.append-rm').click(function() {
		undoH = ($('.c-header').val() == '') ? undoH : $('.c-header').val();
		undoL = ($('.c-img').val() == '') ? undoL : $('.c-img').val();
		undoC = ($('.c-body').val() == '') ? undoC : $('.c-body').val();
		undoA = ($('.c-alt').val() == '') ? undoA : $('.c-alt').val();
		if (checkform() == true) {
			counter ++;
			rmheader = '\n  <h3>' + undoH + '</h3> \n';
			rmlink = '\n  <img alt="' + undoA + '" src="' + undoL + '"/> \n';
			rmcontent = '  <p>' + undoC + '</p> \n';
			flEv = (counter % 2 === 0) ? "fr" : "fl";
			flOd = (counter % 2 === 0) ? "fl" : "fr";
			$('.output').append('<div class="rmc rm-'+ counter + '">' + htmlEncode('<div class="rm-row">\n <div class="rm-body ' + flEv + '">' + rmheader + rmcontent + ' </div>\n <div class="rm-img ' + flOd + '">' + rmlink + ' </div>\n</div>') + '<br>');
			clearForm();
			filterLast();
			uPreview();
		}
	});

	$('.output').keypress(function() {
		$('.save-rm').fadeIn();
	});

	$('.save-rm').click(function() {
		uPreview();
		$(this).fadeOut();
	});

	$('.undo-rm').click(function() {
		undoEl = $('.rm-' + counter);
		if (undoEl.length) {
			undoEl.remove();
			undoForm();
			filterLast();
			uPreview();
		}
	});

	$('.copy-rm').click(function() {
		$('#txt-styling').val('<style type="text/css"> .rm-row, .rm-row * { box-sizing: content-box !important; } .rm-row { width: 100%; overflow: hidden; padding-top: 25px; padding-bottom: 25px; border-bottom: 1px solid #eee; display: table; table-layout: fixed; } .rm-row-media-left img { float: left; max-width: 50%; display: block; margin-left: auto; margin-right: auto; } .rm-row-last { width: 100%; overflow: hidden; padding-top: 25px; padding-bottom: 25px; table-layout: fixed; } .scale-down img { max-width: 65% !important; } .rm-left { width: 43%; padding-right: 2.5%; float: left; } .rm-right { width: 50%; padding-right: 2.5%; float: right; } .rm-img { width: 43%; } .rm-img img { max-width: 100%; display: block; margin-left: auto; margin-right: auto; } .rm-body { width: 50%; text-align: left; padding-top: 10px; padding-right: 3.5%; padding-left: 3.5%; } .rm-row-last a{ color: #76b800; } .fl { float: left; } .fr { float: right; } .down-5 { margin-top: 5px; } .down-10 { margin-top: 10px; } .down-20 { margin-top: 20px; } .down-30 { margin-top: 30px; } .down-40 { margin-top: 40px; }</style> ' + $('.output').text());
		copyToClipboardMsg(document.getElementById('txt-styling'), "msg");
		$('#txt-styling').val('');
	});

	$('.copy-html').click(function() {
		copyToClipboardMsg(document.getElementById('output'), "msg");
	});

	$(".c-img").hover(function(e){
			iX = $(".c-img").val();
			if (iX != '') {
				$(".col-left").append("<p id='preview'><img src='"+ iX +"'/></p>");
				$("#preview img")
				.on('load', function() {
					$("#preview").fadeIn("fast");
				})
				.on('error', function() {
					$('#preview').remove();
				});
			}
		}, function() {
			$('#preview').remove();
		});
	function undoForm(){
		$('.c-header').val(undoH);
		$('.c-img').val(undoL);
		$('.c-body').val(undoC);
		$('.c-alt').val(undoA);
		counter = counter - 1;
	}

	function normalizeForm(){
		$('input[type=text], textarea').css({
			'border-color' : '#D9E0E3'
		});
		$('.c-field label').css({
			'color' : '#D9E0E3'
		});
	}
	function checkform(){
		cc = 0;
		$('input[type=text], textarea').each(function() {
			elem = $(this);
			if (elem.val() == "") {
				cc ++;
				elem.css({
					'border-color' : '#F23F3F'
				});
				$(this).parent().find('label').css({
					'color' : '#F23F3F'
				});
				setTimeout( normalizeForm, 2500);
			}
		});
		console.log(cc);
		if (cc == 1) {
			return true;
		}
	}

	function clearForm(){
		$('input[type=text], textarea').each(function() {
			$(this).val('');
		});
	}

	function uPreview(){
		$('.preview').html(htmlDecode($('.output').html()));
	}

	function filterLast(){
		$('.output .rmc').each(function() {
			oldRTx = htmlDecode($(this).html());
			$(this).text(oldRTx.replace('<div class="rm-row-last">', '<div class="rm-row">'));
		});
		oldTx = htmlDecode($('.rm-' + counter).html());
		$('.output .rm-' + counter).text(oldTx.replace('<div class="rm-row">', '<div class="rm-row-last">'));
	}

	function htmlEncode(value){
		return $('<div/>').text(value).html();
	}
	function htmlDecode(value){
		return $('<div/>').html(value).text();
	}

	function copyToClipboardMsg(elem, msgElem) {
			var succeed = copyToClipboard(elem);
			var msg;
			if (!succeed) {
					msg = "Copy not supported or blocked.  Press Ctrl+c to copy."
			} else {
					msg = "HTML copied!"
			}
			if (typeof msgElem === "string") {
					msgElem = document.getElementById(msgElem);
			}
			msgElem.innerHTML = msg;
			setTimeout(function() {
					msgElem.innerHTML = "";
			}, 3000);
	}
	function copyToClipboard(elem) {
			var targetId = "_hiddenCopyText_";
			var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
			var origSelectionStart, origSelectionEnd;
			if (isInput) {
					target = elem;
					origSelectionStart = elem.selectionStart;
					origSelectionEnd = elem.selectionEnd;
			} else {
					target = document.getElementById(targetId);
					if (!target) {
							var target = document.createElement("textarea");
							target.style.position = "absolute";
							target.style.left = "-9999px";
							target.style.top = "0";
							target.id = targetId;
							document.body.appendChild(target);
					}
					target.textContent = elem.textContent;
			}
			var currentFocus = document.activeElement;
			target.focus();
			target.setSelectionRange(0, target.value.length);

			var succeed;
			try {
					succeed = document.execCommand("copy");
			} catch(e) {
					succeed = false;
			}
			if (currentFocus && typeof currentFocus.focus === "function") {
					currentFocus.focus();
			}

			if (isInput) {
					elem.setSelectionRange(origSelectionStart, origSelectionEnd);
			} else {
					target.textContent = "";
			}
			return succeed;
	}
});
