<div class='panel'>
    <ul id="itemPager" class="pager">
        <li onclick="{{prev.click}}"><button class="btn btn-info {{prev.cssClass}}"> {{prev.text}} </button></li>
        <li onclick="{{next.click}}"><button class="btn btn-info {{next.cssClass}}"> {{next.text}} </button></li>
    </ul>
    <iframe id='DictionaryItemView' src='{{src}}' frameBorder="0" style="width:100%; min-height: 480px;"></iframe>	 
</div>