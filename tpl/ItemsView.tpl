<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading"><strong id="CategoryNameHeader"></strong></div>        
    <table class="table">
        <colgroup>
            <col class="col-lg-6 col-xs-6"></col>
            <col class="col-lg-6 col-xs-6"></col>
        </colgroup>
        {{#each category}}
        <tr>
            <td>
                <button type="button" class="btn btn-default glyphicon glyphicon-plus-sign"> </button> 
                {{setIndex @index}}. {{Word}}</td>
            <td> 
                <div>
                    <div class="pull-left">
                        <a href="#item/{{CategoryId}}/{{Id}}/1" class="margin-small text-right btn btn-default glyphicon glyphicon-new-window"> </a>
                    </div>
                    <div onclick="LoadForvoLink('{{Translation1}}', this)" style='cursor: pointer;'>
                        <button type="button" class="margin-small btn btn-default glyphicon glyphicon-play"> </button>
                        {{Translation1}}
                    </div>
                </div>
               {{#if Translation2}}
               <div>
                    <div class="pull-left">
                        <a href="#item/{{CategoryId}}/{{Id}}/2" class="margin-small text-right btn btn-default glyphicon glyphicon-new-window"> </a>
                    </div>
                    <div onclick="LoadForvoLink('{{Translation1}}', this)" style='cursor: pointer;'>
                        <button type="button" class="margin-small btn btn-default glyphicon glyphicon-play"> </button>
                        {{Translation2}}
                    </div> 
                </div>
                {{/if}}
                </div> 
            </td>
        </tr>
        {{/each}}
    </table>
</div>    

