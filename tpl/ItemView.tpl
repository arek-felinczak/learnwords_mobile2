<div>
    <div class="col-xs-12">
        <ul class="pagination center">
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
                    <button style='cursor: pointer' onclick="app_router.navigate('#itemEditForm/{{model.CategoryId}}/{{model.Id}}',true);return false;" 
                            class="pointer btn btn-text btn-default btn-lg">
                        <span class="glyphicon glyphicon-edit"><br />
                            <span class="text-small">edit</span>
                        </span>
                    </button>
                </div>
            </div>
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
        <iframe id='DictionaryItemView' src='{{src}}' frameBorder="0" style="width:100%; min-height: 480px;"></iframe>	
    </div>
</div>
