<div>
    <div class="col-xs-10 center">
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
            <div class="row">
                <div class="col-xs-10">{{{breadcrumb}}}</div>
                <div class="col-xs-2 text-right">
                    <button style='cursor: pointer' onclick="app_router.navigate('#itemEditForm/{{model.CategoryId}}/{{model.Id}}',true);return false;" class="btn btn-default">
                        <span class="glyphicon glyphicon-edit"> edit</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <iframe id='DictionaryItemView' src='{{src}}' frameBorder="0" style="width:100%; min-height: 480px;"></iframe>	
        </div>  
    </div>
</div>
