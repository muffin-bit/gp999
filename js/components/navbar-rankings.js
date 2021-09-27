class Header2 extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div id="banner2">
        <div class="topnav" id="rankings-nav">
          <a href="combination_rankings.html">Combination</a>
          <a href="connect_rankings.html">Connect Overall</a>
          <a href="connect_prelim_rankings.html">Cell Prelim</a>
          <a href="connect_final_rankings.html">Cell Final</a>
        </div>
      </div>
    `;
  }
}

$(function(){
  $('.topnav a').each(function(){
    if ($(this).prop('href') == window.location.href) {
      $(this).addClass('current');
    }
  });
});

customElements.define('navbar-rankings-component', Header2);
