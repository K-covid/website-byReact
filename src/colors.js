let links = {
  setColor : function(color){
    let i = 0
    let alist = document.querySelectorAll('a')
    while(i < alist.length) {
      alist[i].style.color = color
      i = i+1
    }
  }
}
let body = {
  setColor :function(color){
    document.querySelector('body').style.color=color
  },
  setBackgroundColor : function(color){
    document.querySelector('body').style.backgroundColor=color
  }
}
function dayNightHandler(props){
  let target = document.querySelector('body')
  if(target.dataset.mode === 'night'){
    body.setColor('black')
    body.setBackgroundColor('white')
    target.dataset.mode = 'day'
    props.value = '야간모드'
    links.setColor("blue")
  }
    else{
      body.setColor('white')
      body.setBackgroundColor('#1b1d25')
      target.dataset.mode = 'night'
      props.value = '주간모드'
      links.setColor("skyblue")
  }
}

export default dayNightHandler