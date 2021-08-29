class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div id="banner">
        <img src="img/Girls_Planet_999_Logo_EN.png">
        <div class="topnav">
          <div class="leftnav">
            <a href="index.html">Home</a>
            <a href="contestants.html">Contestants</a>
            <a href="rankings.html">Rankings</a>
          </div>
          <div class="rightnav">
            <p>Made by Muffin and Pie</p>
        </div>
        </div>
      </div>
    `;
  }
}

$(function(){
  $('.leftnav a').each(function(){
    if ($(this).prop('href') == window.location.href) {
      $(this).addClass('current');
    }
  });
});

customElements.define('navbar-component', Header);
