var _0x3373=['log','floor','fromCharCode','abc','length','concat','0123456789ABCDEF','0123456789abcdef','charCodeAt','charAt','ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/','ceil'];(function(_0x4dbe87,_0x554085){var _0x48f7e8=function(_0x57c46a){while(--_0x57c46a){_0x4dbe87['push'](_0x4dbe87['shift']());}};_0x48f7e8(++_0x554085);}(_0x3373,0x13b));var _0x285c=function(_0x3327d3,_0xb81f2a){_0x3327d3=_0x3327d3-0x0;var _0xe15d45=_0x3373[_0x3327d3];return _0xe15d45;};var hexcase=0x0;var b64pad='';function hex_md5(_0x4be6e0){return rstr2hex(rstr_md5(str2rstr_utf8(_0x4be6e0)));}function b64_md5(_0x4c5a0a){return rstr2b64(rstr_md5(str2rstr_utf8(_0x4c5a0a)));}function any_md5(_0xa36aba,_0x10b9c8){return rstr2any(rstr_md5(str2rstr_utf8(_0xa36aba)),_0x10b9c8);}function hex_hmac_md5(_0x585c9f,_0x24d7a0){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(_0x585c9f),str2rstr_utf8(_0x24d7a0)));}function b64_hmac_md5(_0xbbbcc4,_0xf77a5e){return rstr2b64(rstr_hmac_md5(str2rstr_utf8(_0xbbbcc4),str2rstr_utf8(_0xf77a5e)));}function any_hmac_md5(_0x5075e6,_0x4ca51e,_0x11697d){return rstr2any(rstr_hmac_md5(str2rstr_utf8(_0x5075e6),str2rstr_utf8(_0x4ca51e)),_0x11697d);}function md5_vm_test(){return hex_md5(_0x285c('0x0'))['toLowerCase']()=='900150983cd24fb0d6963f7d28e17f72';}function rstr_md5(_0x5106c9){return binl2rstr(binl_md5(rstr2binl(_0x5106c9),_0x5106c9[_0x285c('0x1')]*0x8));}function rstr_hmac_md5(_0x3aab26,_0x7f8fb6){var _0x24af32=rstr2binl(_0x3aab26);if(_0x24af32[_0x285c('0x1')]>0x10)_0x24af32=binl_md5(_0x24af32,_0x3aab26[_0x285c('0x1')]*0x8);var _0x4ef00d=Array(0x10),_0x38077d=Array(0x10);for(var _0x21d0b2=0x0;_0x21d0b2<0x10;_0x21d0b2++){_0x4ef00d[_0x21d0b2]=_0x24af32[_0x21d0b2]^0x36363636;_0x38077d[_0x21d0b2]=_0x24af32[_0x21d0b2]^0x5c5c5c5c;}var _0xe87de3=binl_md5(_0x4ef00d[_0x285c('0x2')](rstr2binl(_0x7f8fb6)),0x200+_0x7f8fb6[_0x285c('0x1')]*0x8);return binl2rstr(binl_md5(_0x38077d[_0x285c('0x2')](_0xe87de3),0x200+0x80));}function rstr2hex(_0x385d5a){try{hexcase;}catch(_0x483dcd){hexcase=0x0;}var _0x4e69bb=hexcase?_0x285c('0x3'):_0x285c('0x4');var _0xf9b2e='';var _0x11bf44;for(var _0xfde1a8=0x0;_0xfde1a8<_0x385d5a[_0x285c('0x1')];_0xfde1a8++){_0x11bf44=_0x385d5a[_0x285c('0x5')](_0xfde1a8);_0xf9b2e+=_0x4e69bb[_0x285c('0x6')](_0x11bf44>>>0x4&0xf)+_0x4e69bb[_0x285c('0x6')](_0x11bf44&0xf);}return _0xf9b2e;}function rstr2b64(_0x54a326){try{b64pad;}catch(_0xec2679){b64pad='';}var _0x1f8c7b=_0x285c('0x7');var _0x3dc551='';var _0x3ae13c=_0x54a326[_0x285c('0x1')];for(var _0x406a82=0x0;_0x406a82<_0x3ae13c;_0x406a82+=0x3){var _0xec2cb0=_0x54a326[_0x285c('0x5')](_0x406a82)<<0x10|(_0x406a82+0x1<_0x3ae13c?_0x54a326[_0x285c('0x5')](_0x406a82+0x1)<<0x8:0x0)|(_0x406a82+0x2<_0x3ae13c?_0x54a326[_0x285c('0x5')](_0x406a82+0x2):0x0);for(var _0xe54ea4=0x0;_0xe54ea4<0x4;_0xe54ea4++){if(_0x406a82*0x8+_0xe54ea4*0x6>_0x54a326[_0x285c('0x1')]*0x8)_0x3dc551+=b64pad;else _0x3dc551+=_0x1f8c7b[_0x285c('0x6')](_0xec2cb0>>>0x6*(0x3-_0xe54ea4)&0x3f);}}return _0x3dc551;}function rstr2any(_0x3f41f7,_0x1a5d04){var _0x48a050=_0x1a5d04['length'];var _0x4ff2fe,_0x4a3e90,_0x2b2317,_0x5aa03a,_0x56867b;var _0x27d686=Array(Math[_0x285c('0x8')](_0x3f41f7[_0x285c('0x1')]/0x2));for(_0x4ff2fe=0x0;_0x4ff2fe<_0x27d686[_0x285c('0x1')];_0x4ff2fe++){_0x27d686[_0x4ff2fe]=_0x3f41f7['charCodeAt'](_0x4ff2fe*0x2)<<0x8|_0x3f41f7[_0x285c('0x5')](_0x4ff2fe*0x2+0x1);}var _0x5eca57=Math[_0x285c('0x8')](_0x3f41f7['length']*0x8/(Math['log'](_0x1a5d04[_0x285c('0x1')])/Math[_0x285c('0x9')](0x2)));var _0x1c8ebc=Array(_0x5eca57);for(_0x4a3e90=0x0;_0x4a3e90<_0x5eca57;_0x4a3e90++){_0x56867b=Array();_0x5aa03a=0x0;for(_0x4ff2fe=0x0;_0x4ff2fe<_0x27d686['length'];_0x4ff2fe++){_0x5aa03a=(_0x5aa03a<<0x10)+_0x27d686[_0x4ff2fe];_0x2b2317=Math[_0x285c('0xa')](_0x5aa03a/_0x48a050);_0x5aa03a-=_0x2b2317*_0x48a050;if(_0x56867b[_0x285c('0x1')]>0x0||_0x2b2317>0x0)_0x56867b[_0x56867b['length']]=_0x2b2317;}_0x1c8ebc[_0x4a3e90]=_0x5aa03a;_0x27d686=_0x56867b;}var _0xdd2e3='';for(_0x4ff2fe=_0x1c8ebc['length']-0x1;_0x4ff2fe>=0x0;_0x4ff2fe--)_0xdd2e3+=_0x1a5d04['charAt'](_0x1c8ebc[_0x4ff2fe]);return _0xdd2e3;}function str2rstr_utf8(_0xbbfa6a){var _0x4e47bd='';var _0x5d05db=-0x1;var _0x3c05af,_0x3d7c;while(++_0x5d05db<_0xbbfa6a[_0x285c('0x1')]){_0x3c05af=_0xbbfa6a[_0x285c('0x5')](_0x5d05db);_0x3d7c=_0x5d05db+0x1<_0xbbfa6a['length']?_0xbbfa6a[_0x285c('0x5')](_0x5d05db+0x1):0x0;if(0xd800<=_0x3c05af&&_0x3c05af<=0xdbff&&0xdc00<=_0x3d7c&&_0x3d7c<=0xdfff){_0x3c05af=0x10000+((_0x3c05af&0x3ff)<<0xa)+(_0x3d7c&0x3ff);_0x5d05db++;}if(_0x3c05af<=0x7f)_0x4e47bd+=String['fromCharCode'](_0x3c05af);else if(_0x3c05af<=0x7ff)_0x4e47bd+=String[_0x285c('0xb')](0xc0|_0x3c05af>>>0x6&0x1f,0x80|_0x3c05af&0x3f);else if(_0x3c05af<=0xffff)_0x4e47bd+=String[_0x285c('0xb')](0xe0|_0x3c05af>>>0xc&0xf,0x80|_0x3c05af>>>0x6&0x3f,0x80|_0x3c05af&0x3f);else if(_0x3c05af<=0x1fffff)_0x4e47bd+=String[_0x285c('0xb')](0xf0|_0x3c05af>>>0x12&0x7,0x80|_0x3c05af>>>0xc&0x3f,0x80|_0x3c05af>>>0x6&0x3f,0x80|_0x3c05af&0x3f);}return _0x4e47bd;}function str2rstr_utf16le(_0x21707b){var _0x27a704='';for(var _0x375190=0x0;_0x375190<_0x21707b[_0x285c('0x1')];_0x375190++)_0x27a704+=String[_0x285c('0xb')](_0x21707b[_0x285c('0x5')](_0x375190)&0xff,_0x21707b['charCodeAt'](_0x375190)>>>0x8&0xff);return _0x27a704;}function str2rstr_utf16be(_0xf26807){var _0x5ad33a='';for(var _0x53034d=0x0;_0x53034d<_0xf26807[_0x285c('0x1')];_0x53034d++)_0x5ad33a+=String[_0x285c('0xb')](_0xf26807[_0x285c('0x5')](_0x53034d)>>>0x8&0xff,_0xf26807[_0x285c('0x5')](_0x53034d)&0xff);return _0x5ad33a;}function rstr2binl(_0x500210){var _0x35ae3a=Array(_0x500210['length']>>0x2);for(var _0x4bb725=0x0;_0x4bb725<_0x35ae3a[_0x285c('0x1')];_0x4bb725++)_0x35ae3a[_0x4bb725]=0x0;for(var _0x4bb725=0x0;_0x4bb725<_0x500210[_0x285c('0x1')]*0x8;_0x4bb725+=0x8)_0x35ae3a[_0x4bb725>>0x5]|=(_0x500210[_0x285c('0x5')](_0x4bb725/0x8)&0xff)<<_0x4bb725%0x20;return _0x35ae3a;}function binl2rstr(_0x90e30a){var _0x57cfaa='';for(var _0x1c3cb2=0x0;_0x1c3cb2<_0x90e30a['length']*0x20;_0x1c3cb2+=0x8)_0x57cfaa+=String[_0x285c('0xb')](_0x90e30a[_0x1c3cb2>>0x5]>>>_0x1c3cb2%0x20&0xff);return _0x57cfaa;}function binl_md5(_0x170050,_0x593aa3){_0x170050[_0x593aa3>>0x5]|=0x80<<_0x593aa3%0x20;_0x170050[(_0x593aa3+0x40>>>0x9<<0x4)+0xe]=_0x593aa3;var _0x86087d=0x67452301;var _0x5ec38b=-0x10325477;var _0x50b671=-0x67452302;var _0x115e20=0x10325476;for(var _0x4e6387=0x0;_0x4e6387<_0x170050[_0x285c('0x1')];_0x4e6387+=0x10){var _0x3f4363=_0x86087d;var _0x5643d5=_0x5ec38b;var _0x275b61=_0x50b671;var _0x4993e3=_0x115e20;_0x86087d=md5_ff(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0x0],0x7,-0x28955b88);_0x115e20=md5_ff(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0x1],0xc,-0x173848aa);_0x50b671=md5_ff(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0x2],0x11,0x242070db);_0x5ec38b=md5_ff(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0x3],0x16,-0x3e423112);_0x86087d=md5_ff(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0x4],0x7,-0xa83f051);_0x115e20=md5_ff(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0x5],0xc,0x4787c62a);_0x50b671=md5_ff(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0x6],0x11,-0x57cfb9ed);_0x5ec38b=md5_ff(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0x7],0x16,-0x2b96aff);_0x86087d=md5_ff(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0x8],0x7,0x698098d8);_0x115e20=md5_ff(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0x9],0xc,-0x74bb0851);_0x50b671=md5_ff(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0xa],0x11,-0xa44f);_0x5ec38b=md5_ff(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0xb],0x16,-0x76a32842);_0x86087d=md5_ff(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0xc],0x7,0x6b901122);_0x115e20=md5_ff(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0xd],0xc,-0x2678e6d);_0x50b671=md5_ff(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0xe],0x11,-0x5986bc72);_0x5ec38b=md5_ff(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0xf],0x16,0x49b40821);_0x86087d=md5_gg(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0x1],0x5,-0x9e1da9e);_0x115e20=md5_gg(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0x6],0x9,-0x3fbf4cc0);_0x50b671=md5_gg(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0xb],0xe,0x265e5a51);_0x5ec38b=md5_gg(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0x0],0x14,-0x16493856);_0x86087d=md5_gg(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0x5],0x5,-0x29d0efa3);_0x115e20=md5_gg(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0xa],0x9,0x2441453);_0x50b671=md5_gg(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0xf],0xe,-0x275e197f);_0x5ec38b=md5_gg(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0x4],0x14,-0x182c0438);_0x86087d=md5_gg(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0x9],0x5,0x21e1cde6);_0x115e20=md5_gg(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0xe],0x9,-0x3cc8f82a);_0x50b671=md5_gg(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0x3],0xe,-0xb2af279);_0x5ec38b=md5_gg(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0x8],0x14,0x455a14ed);_0x86087d=md5_gg(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0xd],0x5,-0x561c16fb);_0x115e20=md5_gg(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0x2],0x9,-0x3105c08);_0x50b671=md5_gg(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0x7],0xe,0x676f02d9);_0x5ec38b=md5_gg(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0xc],0x14,-0x72d5b376);_0x86087d=md5_hh(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0x5],0x4,-0x5c6be);_0x115e20=md5_hh(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0x8],0xb,-0x788e097f);_0x50b671=md5_hh(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0xb],0x10,0x6d9d6122);_0x5ec38b=md5_hh(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0xe],0x17,-0x21ac7f4);_0x86087d=md5_hh(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0x1],0x4,-0x5b4115bc);_0x115e20=md5_hh(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0x4],0xb,0x4bdecfa9);_0x50b671=md5_hh(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0x7],0x10,-0x944b4a0);_0x5ec38b=md5_hh(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0xa],0x17,-0x41404390);_0x86087d=md5_hh(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0xd],0x4,0x289b7ec6);_0x115e20=md5_hh(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0x0],0xb,-0x155ed806);_0x50b671=md5_hh(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0x3],0x10,-0x2b10cf7b);_0x5ec38b=md5_hh(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0x6],0x17,0x4881d05);_0x86087d=md5_hh(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0x9],0x4,-0x262b2fc7);_0x115e20=md5_hh(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0xc],0xb,-0x1924661b);_0x50b671=md5_hh(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0xf],0x10,0x1fa27cf8);_0x5ec38b=md5_hh(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0x2],0x17,-0x3b53a99b);_0x86087d=md5_ii(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0x0],0x6,-0xbd6ddbc);_0x115e20=md5_ii(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0x7],0xa,0x432aff97);_0x50b671=md5_ii(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0xe],0xf,-0x546bdc59);_0x5ec38b=md5_ii(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0x5],0x15,-0x36c5fc7);_0x86087d=md5_ii(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0xc],0x6,0x655b59c3);_0x115e20=md5_ii(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0x3],0xa,-0x70f3336e);_0x50b671=md5_ii(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0xa],0xf,-0x100b83);_0x5ec38b=md5_ii(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0x1],0x15,-0x7a7ba22f);_0x86087d=md5_ii(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0x8],0x6,0x6fa87e4f);_0x115e20=md5_ii(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0xf],0xa,-0x1d31920);_0x50b671=md5_ii(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0x6],0xf,-0x5cfebcec);_0x5ec38b=md5_ii(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0xd],0x15,0x4e0811a1);_0x86087d=md5_ii(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20,_0x170050[_0x4e6387+0x4],0x6,-0x8ac817e);_0x115e20=md5_ii(_0x115e20,_0x86087d,_0x5ec38b,_0x50b671,_0x170050[_0x4e6387+0xb],0xa,-0x42c50dcb);_0x50b671=md5_ii(_0x50b671,_0x115e20,_0x86087d,_0x5ec38b,_0x170050[_0x4e6387+0x2],0xf,0x2ad7d2bb);_0x5ec38b=md5_ii(_0x5ec38b,_0x50b671,_0x115e20,_0x86087d,_0x170050[_0x4e6387+0x9],0x15,-0x14792c6f);_0x86087d=safe_add(_0x86087d,_0x3f4363);_0x5ec38b=safe_add(_0x5ec38b,_0x5643d5);_0x50b671=safe_add(_0x50b671,_0x275b61);_0x115e20=safe_add(_0x115e20,_0x4993e3);}return Array(_0x86087d,_0x5ec38b,_0x50b671,_0x115e20);}function md5_cmn(_0x5ce113,_0x21cd98,_0x3d5e23,_0x3599c5,_0x5e4eed,_0x385407){return safe_add(bit_rol(safe_add(safe_add(_0x21cd98,_0x5ce113),safe_add(_0x3599c5,_0x385407)),_0x5e4eed),_0x3d5e23);}function md5_ff(_0x305448,_0x2dfa2a,_0x41cdc7,_0x68e6fb,_0x558d00,_0x578580,_0xf42335){return md5_cmn(_0x2dfa2a&_0x41cdc7|~_0x2dfa2a&_0x68e6fb,_0x305448,_0x2dfa2a,_0x558d00,_0x578580,_0xf42335);}function md5_gg(_0x4ad8aa,_0x489e0b,_0xbf466,_0x247233,_0xc2a8b9,_0x52fa8d,_0x2851d0){return md5_cmn(_0x489e0b&_0x247233|_0xbf466&~_0x247233,_0x4ad8aa,_0x489e0b,_0xc2a8b9,_0x52fa8d,_0x2851d0);}function md5_hh(_0x3c6f80,_0x2bc218,_0x592a2f,_0x3a1f1b,_0x24c39f,_0x3936ec,_0x4ce6ed){return md5_cmn(_0x2bc218^_0x592a2f^_0x3a1f1b,_0x3c6f80,_0x2bc218,_0x24c39f,_0x3936ec,_0x4ce6ed);}function md5_ii(_0x34a01e,_0x363da4,_0x779f51,_0x36782f,_0x3cd906,_0x446923,_0x17f634){return md5_cmn(_0x779f51^(_0x363da4|~_0x36782f),_0x34a01e,_0x363da4,_0x3cd906,_0x446923,_0x17f634);}function safe_add(_0x3f1be1,_0x5a106f){var _0x411683=(_0x3f1be1&0xffff)+(_0x5a106f&0xffff);var _0x12f92d=(_0x3f1be1>>0x10)+(_0x5a106f>>0x10)+(_0x411683>>0x10);return _0x12f92d<<0x10|_0x411683&0xffff;}function bit_rol(_0x1702be,_0x1b437d){return _0x1702be<<_0x1b437d|_0x1702be>>>0x20-_0x1b437d;}