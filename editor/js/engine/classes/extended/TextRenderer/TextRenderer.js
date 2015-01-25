﻿/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
*
* TextRenderer
**/

/**
** The TextRenderer is child of Renderer
** It draws a colored square for the gameObject
** need the GameObject to draw
** list of params are the sames as Renderer
**/

define( [ 'DE.Renderer', 'DE.TextRenderer.render', 'DE.CONFIG', 'DE.Sizes', 'DE.CanvasBuffer' ],
function( Renderer, TextRender, CONFIG, Sizes, CanvasBuffer )
{
  function TextRenderer( param, width, height, text )
  {
    Renderer.call( this, param );
    
    this.DEName = "TextRenderer";
    
    if ( !param && !text )
    {
      return;
    }
    
    this.text = text || undefined;
    this.sizes = new Sizes( width, height, 1, 1 );
    this.localPosition.x -= width * 0.5;
    this.localPosition.y -= height * 0.5;
    
    if ( param.offsetX != undefined )
    {
      this.localPosition.x = param.offsetX + ( param.x || 0 );
    }
    if ( param.offsetY != undefined )
    {
      this.localPosition.y = param.offsetY + ( param.y || 0 );
    }
    
    this.fontSize = param.fontSize || 20;
    this.font = param.font || 'Calibri';
    
    this.init = function()
    {
      this.buffer = new CanvasBuffer( this.sizes.width, this.sizes.height );
      this.clearBuffer();
    }
    
    /***
    * @public @clearBuffer clear the buffer and redraw text
    */
    this.clearBuffer = function()
    {
      this.buffer.ctx.clearRect( 0, 0, this.sizes.width, this.sizes.height );
      this.buffer.ctx.font = ( this.fontSize ) + 'pt ' + ( this.font );
      this.buffer.ctx.textAlign = "center";
      this.buffer.ctx.textBaseline = "middle";
      if ( this.fillColor )
      {
        this.buffer.ctx.fillStyle = this.fillColor;
        this.buffer.ctx.fillText( this.text, this.sizes.width * 0.5, this.sizes.height * 0.5, this.sizes.width );
      }
      
      if ( this.strokeColor )
      {
        if ( this.fillColor )
        {
          this.buffer.ctx.globalAlpha = 0.8;
        }
        this.buffer.ctx.strokeStyle = this.strokeColor;
        this.buffer.ctx.strokeText( this.text, this.sizes.width * 0.5, this.sizes.height * 0.5, this.sizes.width );
      }
    }
      
    /***
    * @changeSizes
    ***/
    this.changeSizes = function( newWidth, newHeight )
    {
      var deltaw = newWidth - this.sizes.width
      this.sizes.width = newWidth;
      
      var deltah = newHeight - this.sizes.height
      this.sizes.height = newHeight;
      
      this.localPosition.x -= ( deltaw * 0.5 );
      this.localPosition.y -= ( deltah * 0.5 );
    }
    /* // */
    
    this.init( param );
  }

  TextRenderer.prototype = new Renderer();
  TextRenderer.prototype.constructor = TextRenderer;
  TextRenderer.prototype.supr = Renderer.prototype;
  
  TextRenderer.prototype.render = TextRender;
  
  if ( CONFIG.DEBUG && CONFIG.DEBUG_LEVEL >= 3 )
  {
    console.log( "TextRenderer loaded" );
  }
  return TextRenderer;
} );