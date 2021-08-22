const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
  <style>
    #banner {
      background: #FFF0FD; /*url("../img/banner.png") center center; */
      height: 200px;
      box-sizing: border-box;
      position: relative;
      /* top: -25px; */
      /* top: 0px; */
      text-align: center;
      padding-top: 20px;
      margin-bottom: 40px; }
      #banner img {
        max-height: 120px; }

    .topnav {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
      overflow: hidden;
      font-size: 18px;
      font-weight 700;
      text-transform: uppercase;}

      .topnav .rightnav {
        padding-right: 40px;
        text-align: right;
        color: #AAA; }

      .topnav .leftnav {
        padding-left: 40px;
        text-align: left; }

      .topnav a + a {
        margin-left: 40px; }

      .topnav a:link {
        color: #AAA;
        background-color: transparent;
        text-decoration: none; }

      .topnav a:visited {
        color: #AAA;
        background-color: transparent;
        text-decoration: none; }

      .topnav a:hover {
        color: white;
        background-color: transparent;
        text-decoration: underline; }

      .topnav #current {
        color: red;
        background-color: transparent;
        text-decoration: underline; }
  </style>
  <div id="banner">
    <img src="img/Girls_Planet_999_Logo_EN.png">
    <div class="topnav">
      <div class="leftnav">
        <a id="current" href="index.html">Home</a>
        <a href="contestants.html">Contestants</a>
        <a href="performances.html">Performances</a>
      </div>
      <div class="rightnav">
        <p>Made by Muffin and Pie</p>
    </div>
    </div>
  </div>
`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(headerTemplate.content);
  }
}

customElements.define('navbar-component', Header);
