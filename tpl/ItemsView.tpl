<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading"><strong id="CategoryNameHeader"></strong></div>        
    <table class="table">
        <colgroup>
            <col class="col-lg-4 col-xs-4"></col>
            <col class="col-lg-8 col-xs-8"></col>
        </colgroup>
        {{#each category}}
        <tr>
            <td>
                <div class="margin-medium">{{setIndex @index}}. {{Word}}</div>
            </td>
            <td style="vertical-align: middle"> 
                <div>
                <div>
                    <button onclick="LoadForvoLink('{{Translation1}}', this)" class="margin-small btn btn-default glyphicon glyphicon-play"></button>
                    <a href="#item/{{CategoryId}}/{{Id}}/1"><button class="margin-small text-right btn btn-default glyphicon glyphicon-export"></button></a>
                    <button type="button" class="btn btn-default glyphicon glyphicon-plus-sign"></button>
                    <span class="margin-small">{{Translation1}}</span>
                </div>
                {{#if Translation2}}
                <div>
                    <button onclick="LoadForvoLink('{{Translation2}}', this)" class="margin-small btn btn-default glyphicon glyphicon-play"></button>
                    <a href="#item/{{CategoryId}}/{{Id}}/2"><button class="margin-small text-right btn btn-default glyphicon glyphicon-export"></button></a>
                    <button type="button" class="btn btn-default glyphicon glyphicon-plus-sign" style="visibility:hidden;" ></button>
                    <span class="margin-small">{{Translation2}}</span>
                </div>
                {{/if}}
                </div> 
            </td>
        </tr>
        {{/each}}
    </table>
</div>    

