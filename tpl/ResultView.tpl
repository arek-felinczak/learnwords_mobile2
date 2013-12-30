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
                <li class="link list-group-item" data-category-id="{{Id}}">
                    <div class="row">
                        <div class="col-xs-5"> {{Question.Word}} </div> 
                        <div class="col-xs-5">{{Answer.Translation1}}</div>
                        <div class="col-xs-1"> 
                            <span class="glyphicon glyphicon-{{# if isCorrect}}chevron-down{{else}}minus-sign{{/if}}"></span> 
                        </div>
                    </div>                   
                </li>               
                {{/each}}
            </ul>
            <div class="row" style="margin-bottom: 10px">
                <div class="col-lg-offset-3 col-lg-10">
                    <button class="btn btn-default btn-lg col-lg-6" onclick="return go('#category/{{Category.Id}}/1')">
                        back 
                    </button>
                </div>
            </div>
        </div>        
    </div>
</div>


   