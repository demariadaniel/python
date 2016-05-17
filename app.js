$(document).ready(function() {

	var editor = CodeMirror($('.target').get(0), {
	    mode: 'python',
	    lineNumbers: true,
	    value: "print 'Hello, world!'"
  	});

	pypyReady = false;
	var result = "";

	pypyjs.ready().then(function(){
		pypyReady = true;
		$('.btn').html('Ready');
		$('.btn').prop('disabled', false);
	})

	$('.btn').click(function() {
		$('.btn').html('Processing');
		$('.btn').prop('disabled', true);
		$('.output').html('');
		pypyReady = false;

		pypyjs.exec(editor.getValue())
			.catch(function(err){
				console.log(err);
				$('.output').append(err.name + ' : ' + err.message);
			});

		pypyjs.stdout = function(data) {
        	$('.output').append(data);
  		} 

		setTimeout(function(){
			$('.btn').html('Ready');
			$('.btn').prop('disabled', false);
			pypyReady = true
		}, 2500);

	});
});