class Header2 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div id="banner2">
        <div class="topnav">
          <div class="leftnav">
            <a href="connect_prelim_rankings.html">Connect Prelim</a>
            <a href="connect_final_rankings.html">Connect Final</a>
            <a href="connect_country_rankings.html">Connect Country</a>
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

customElements.define('navbar-rankings-component', Header2);
