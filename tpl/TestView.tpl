<div class='panel panel-default'>
    <div class="panel-heading">
        {{{breadcrumb}}}
    </div>  
    <div class="panel-body">
        <h4>Category: {{Category.Name}} ({{QuestionIndex}}/{{QuestionNum}})</h4>
        <div id='dictDiv' style="padding-top:5%">
            <h4 style="text-align: center;">Translate: {{Question.Word}} </h4>
            {{#each Answers}}
            <div class='padding-big' style="width:48%; display: inline-block">
                <button type="button" data-index='{{@index}}' class="btn answer btn-lg btn-block" style='padding:10px'>
                    <small>{{Translation1}}</small>
                </button>
            </div>
            {{/each}}
        </div>
        <div id='speechDiv' style="padding-top:5%">            
            <div class="col-xs-10 center">
                <button type="button" id='nextQuestion' class="btn btn-info btn-lg col-xs-7 margin-medium" style='padding:10px'>
                    Next
                </button>
                <button type="button" id='finishTest' class="btn btn-warning btn-lg col-xs-4 margin-medium" style='padding:10px'>
                    Finish
                </button>
            </div>
        </div>
        <br />
    </div>
</div>

