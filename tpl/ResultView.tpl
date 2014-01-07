<div>
    <div id="CategoryListPanel" class='panel panel-default'>
        <div class="panel-heading">
            {{{breadcrumb}}}
        </div>
        <div class="panel-body">
            <h4 class="{{ResultCss}}"> Your score for category {{Category.Name}} is {{Result.Score}} / {{Result.TestLength}}. </h4>
        </div>
        <div>        
            <ul class="list-group" id='ResultList'>
                {{#each Results}}        
                <li class="link list-group-item" data-link="item/{{Question.CategoryId}}/{{Question.Id}}/1">
                    <div class="row">
                        <div class="col-xs-4">{{Question.Word}}</div> 
                        <div class="col-xs-4">{{Answer.Translation1}}</div>
                        <div class="col-xs-3">{{Question.Translation1}}</div>
                        <div class="col-xs-1"> 
                            <span class="glyphicon glyphicon-{{# if isCorrect}}chevron-down{{else}}minus-sign{{/if}}"></span> 
                        </div>
                    </div>                   
                </li>               
                {{/each}}
            </ul>
            <div style="margin-bottom: 10px">
                <button class="center btn btn-default btn-lg col-xs-9" onclick="return go('#category/{{Category.Id}}/1')">
                    back 
                </button>
             </div>
        </div>        
    </div>
</div>


   