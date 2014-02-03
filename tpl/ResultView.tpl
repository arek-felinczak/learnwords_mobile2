<div>
    <div id="CategoryListPanel" class='panel panel-default'>
        <div class="panel-heading">
            {{{breadcrumb}}}
        </div>
        <div class="panel-body">
            <h4 class="{{ResultCss}}">Category {{Category.Name}} score {{Result.Score}}/{{Result.TestLength}}. </h4>
        </div>
        <div>        
            <ul class="list-group" id='ResultList'>
                {{#each Results}}        
                <li class="link list-group-item" data-link="item/{{Question.CategoryId}}/{{Question.Id}}/1">
                    <div class="row">
                        <div class="col-xs-5"><small>{{Question.Word}}</small></div> 
                        <div class="col-xs-3"><small>{{Answer.Translation1}}</small></div>
                        <div class="col-xs-4">
                            <small>{{Question.Translation1}}</small>
                            <span class="glyphicon glyphicon-{{# if isCorrect}}chevron-down{{else}}minus-sign{{/if}}" style='float:right'></span> 
                        </div>
                    </div>                   
                </li>               
                {{/each}}
            </ul>
            <div style="margin-bottom: 10px">
                <button style='padding:10px' class="center btn btn-default btn-lg col-xs-9" onclick="return go('#category/{{Category.Id}}/1')">
                    back 
                </button>
             </div>
        </div>        
    </div>
</div>


   