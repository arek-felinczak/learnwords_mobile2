<div>
    <div class="col-xs-12">
        <ul class="pagination center">
            {{#each pager}}
            <li onclick="$('#DictionaryItemView').remove(); return go('{{url}}');" class="pointer">
                {{{inputHtml}}}
            </li>
            {{/each}}
        </ul>
    </div>
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
            <div class="hidden" id="helpDiv">
                <p> Tap on <span class="glyphicon glyphicon-edit"></span> to fix translation errors.</p>
            </div>
            <span class="col-xs-4"><strong>Word:</strong></span>
            <span class="col-xs-8">{{model.Word}}</span>
            <br />
            <span class="col-xs-4"><strong>Translation:</strong></span>
            <span class="col-xs-8">{{model.Translation1}} {{model.Translation2}} </span>
            <br />
            <span class="col-xs-4"><strong>Category:</strong></span>
            <span class="col-xs-8">{{category.Name}}</span>           
        </div>  
        <iframe id='DictionaryItemView' src='{{src}}' class="col-xs-12" onLoad="$(this).show()" 
                frameBorder="0" style="min-height: 480px; display:none; overflow: scroll"></iframe>	
    </div>
</div>
