class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div id="banner">
        <div id="credits">
          <p>Fansite by Muffin and Pie</p>
        </div>
        <img id="logo" src="img/Girls_Planet_999_Logo_EN.png">
        <div class="topnav">
          <div class="leftnav">
            <a href="contestants.html">Contestants</a>
            <a href="connect_prelim_rankings.html">Rankings</a>
            <a href="voting.html">Voting</a>
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
