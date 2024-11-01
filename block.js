( function( blocks, editor, i18n, element ) {
	var el = element.createElement;
	var __ = i18n.__;
  var RichText = editor.RichText;
  

  // const { Icon } = wp.components;
  const iconElement = el('svg', { width: 20, height: 20 },
      el('path', { d: "M12.5,12H12v-0.5c0-0.3-0.2-0.5-0.5-0.5H11V6h1l1-2c-1,0.1-2,0.1-3,0C9.2,3.4,8.6,2.8,8,2V1.5C8,1.2,7.8,1,7.5,1 S7,1.2,7,1.5V2C6.4,2.8,5.8,3.4,5,4C4,4.1,3,4.1,2,4l1,2h1v5c0,0-0.5,0-0.5,0C3.2,11,3,11.2,3,11.5V12H2.5C2.2,12,2,12.2,2,12.5V13 h11v-0.5C13,12.2,12.8,12,12.5,12z M7,11H5V6h2V11z M10,11H8V6h2V11z" } ),
      
  );

	blocks.registerBlockType( 'webar/apple-ar', {
    title: __( 'Web AR', 'webar' ),
    description:__('This block will help you adding AR assets in wordpress website.'),
		icon: iconElement,
		category: 'WebAR',

		attributes: {
      url: {type: 'string'},
      src: {type: 'string'},
      w: {type: 'string'},
      h: {type: 'string'},
    },

		example: {
			attributes: {
        content: __( 'Web AR Examples' ),
        url: 'https://developer.apple.com/augmented-reality/quick-look/',
        src: 'Apple Inc.'
			},
		},

		edit: function(props) {
      function updateURL(event) {
        props.setAttributes({url: event.target.value})
      }
      function updateSRC(event) {
        props.setAttributes({src: event.target.value})
      }
      function updateW(event) {
        props.setAttributes({w: event.target.value})
      }
      function updateH(event) {
        props.setAttributes({h: event.target.value})
      }

      return el("div", {className: "components-placeholder wp-block-embed is-large"},
      el("div", {className: "components-placeholder__label"},
        el("span", {className: "block-editor-block-icon has-colors"},
          el('svg', { width: 20, height: 20 },
            el('path', { d: "M0,0h24v24H0V0z", fill: "none" } ),
            el('path', { d: "M19,4H5C3.89,4,3,4.9,3,6v12c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.11,4,19,4z M19,18H5V8h14V18z" } ) 
          )
        ), "Apple AR"
      ),
      
      el("div", {className: "components-placeholder__instructions"}, __("Paste a link to the AR (USDZ) content you want to display on your site.")),
      
      el("form", null,
        el("div", {className: "components-placeholder__fieldset",style:{margin:"0 0 10px"}},
          el("input", { type: "text", placeholder: __('Enter AR assests (USDZ) URL here...'), className: "components-placeholder__input", value: props.attributes.url, onChange: updateURL })
        ),
        el("div", {className: "components-placeholder__fieldset",style:{margin:"0 0 10px"}},
          el("input", { type: "text", placeholder: __('Enter placeholder image URL here...'), className: "components-placeholder__input", value: props.attributes.src, onChange: updateSRC })
        ),
        el("div", {className: "components-placeholder__fieldset"},
          el("input", { type: "text", placeholder: __('Width 400px'), className: "components-placeholder__input", value: props.attributes.w, onChange: updateW}),
          el("input", { type: "text", placeholder: __('Height 400px'), className: "components-placeholder__input", value: props.attributes.h, onChange: updateH}),
        )
      ),
      el("div", {className: "components-placeholder__learn-more"},
        el("a", { className: "components-external-link", href: "https://www.futurescape.in/wordpress-webar-plugin/", target:"_blank", rel:"external noreferrer noopener"},//__("Learn more about embeds"),
          el("span", {className: "block-editor-block-icon has-colors"},
            el('svg', { width: 20, height: 20 }, 
              el('path', { d: "M9 3h8v8l-2-1V6.92l-5.6 5.59-1.41-1.41L14.08 5H10zm3 12v-3l2-2v7H3V6h8L9 8H5v7h7z"} ) 
          )
        ))
      )
    )
    },

		save: function( props ) {
      return el('div',null, "[webar url="+ props.attributes.url +" src="+ props.attributes.src +" width="+ props.attributes.w +" height="+ props.attributes.h +" /]");
		},
	} );

} )( window.wp.blocks, window.wp.editor, window.wp.i18n, window.wp.element );