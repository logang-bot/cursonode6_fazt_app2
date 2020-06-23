$('#post-comment').hide()

$('#btn-toggle-comment').click(e=>{
    e.preventDefault()
    $('#post-comment').slideToggle()

})


$('#btn-like').click(function(e){
    e.preventDefault()
    let imgid = $(this).data('id')
    
    $.post('/images/'+imgid+'/like')
    .done(data=>{
        console.log(data)
        $('.likes-count').text(data.likes)
    })
})

$('#btn-delete').click(function(e){
    e.preventDefault()
    let $this = $(this)

    const response = confirm('are you sure you want to delete this image?')
    if(response){
        let imgid = $this.data('id')
        $.ajax({
            url: '/images/'+imgid,
            type: 'DELETE'
        })
        .done(function(result){
            $this.removeClass('btn-danger').addClass('btn-success')
            $this.find('i').removeClass('fa-times').addClass('fa-check')
            $this.append('<span>Deleted</span>')
        })
    }
})