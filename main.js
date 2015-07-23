$(function () {

	var programURL = "http://localhost:3000/programs"
	var courseURL = "http://localhost:3000/courses"

	function getProgram (program) {
		var tmpl = $("#program-template").html()
		var programTmpl = Handlebars.compile(tmpl)
		var info = {
			program: program
		}
		return programTmpl(info)
	}

	function getCourses (course) {
		var tmpl = $("#course-template").html()
		var courseTmpl = Handlebars.compile(tmpl)
		var info = {
			course: course
		}
		return courseTmpl(info)
	}

	$('button').on('click', function() {
		event.preventDefault()
		$('.prgms').show().html('')
		$('.fail').hide()
		$('.awesome').hide()
		$('.courses').hide()
		$.get(programURL)
			.done(function (programs) {
				programs.forEach(function (program) {
					$('.prgms').append(getProgram(program))
				})
			})

	})

	$('ul').on('click', 'li', function () {
		event.preventDefault()
		$('.prgms').hide()
		$('.courses').show().html('<h1>Courses for program:</h1>')
		var idNum = $(this).attr('data-id')
		$.get(courseURL + '?programId=' + idNum)
			.done(function (courses) {
				courses.forEach(function (course) {
					$('.courses').append('<li>' + course.course + '</li>')
				})
			})
	})

	$('.no').on('click', function () {
		event.preventDefault()
		$('.prgms').hide()
		$('.courses').hide()
		$('.awesome').hide()
		$('.fail').show().html('<h1 class="bad">Fine, these classes are too hard for you anyway!</h1>')
	})

	$('.yes').on('click', function () {
		event.preventDefault()
		$('.prgms').hide()
		$('.courses').hide()
		$('.fail').hide()
		$('.awesome').show().html("<h1>This isn't a real school...</h1>")
	})
})

