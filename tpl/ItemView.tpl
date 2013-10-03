<div>
    <div class="col-xs-7 center">
        <ul class="pagination">
            {{#each pager}}
            <li onclick="return go('{{url}}');" class="pointer">
                <button {{#if disabled}} disabled="disabled" {{/if}} class="btn {{cssClass}} btn-lg">{{page}}</button>
            </li>
            {{/each}}
        </ul>
    </div>
    <div id="CategoryListPanel" class='panel panel-default'>
        <div class="panel-heading">
            {{{breadcrumb}}}
        </div>
        <div class="panel-body">
            <iframe id='DictionaryItemView' src='{{src}}' frameBorder="0" style="width:100%; min-height: 480px;"></iframe>	
        </div>  
    </div>
</div>
