<div class='panel'>
    <div class="col-md-4 center">
        <ul class="pagination">
            {{#each pager}}
            <li onclick="return go('{{url}}');" class="pointer">
                <button {{#if disabled}} disabled="disabled" {{/if}} class="btn {{cssClass}}">{{page}}</button>
            </li>
            {{/each}}
        </ul>
    </div>
    <iframe id='DictionaryItemView' src='{{src}}' frameBorder="0" style="width:100%; min-height: 480px;"></iframe>	 
</div>