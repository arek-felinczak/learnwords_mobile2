<div>
    {{#if showPager}}
    <div class="col-xs-12">
        {{{pagerHtml}}}
    </div>
    {{/if}}
    <div id="CategoryListPanel" class='panel panel-default'>
        <div class="panel-heading">
            {{{breadcrumb}}}
            <button style='cursor: pointer; float: right' onclick="app_router.navigate('#itemEditForm/{{model.CategoryId}}/{{model.Id}}',true);return false;" 
                    class="pointer btn btn-default btn-lg text-right">
                <span class="glyphicon glyphicon-edit"><br />
                    <span class="text-small">edit</span>
                </span>
            </button>
        </div>
        <div class="panel-body">
            <div class="row padding-big">
                <span class="col-xs-4"><strong>Word:</strong></span>
                <span class="col-xs-8">{{model.Word}}</span>
            </div>
            <div class="row padding-big">
                <span class="col-xs-4"><strong>Translation:</strong></span>
                <span class="col-xs-8">{{model.Translation1}} {{model.Translation2}} </span>
            </div>
            <div class="row padding-big">
                <span class="col-xs-4"><strong>Category:</strong></span>
                <span class="col-xs-8">{{category.Name}}</span>  
            </div>
        </div>  
        <iframe id='DictionaryItemView' src='{{src}}' class="col-xs-12" onLoad="$(this).show()" 
                frameBorder="0" style="min-height: 480px; display:none; overflow: scroll"></iframe>	
    </div>
</div>
