<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading">
        <strong id="CategoryNameHeader"></strong>
    </div>
    <div class="panel-body">
        <p>Tap on word to play audio file (internet connection needed).</p>
    </div>        
    <table class="table">
        <colgroup>
            <col class="col-lg-4 col-xs-4" />
            <col class="col-lg-8 col-xs-8" />
        </colgroup>
        {{#each category}}
        <tr>
            <td onclick="LoadForvoLink('{{Translation1}}', this)" class="pointer">
                <div class="margin-medium">{{setIndex @index}}. {{Word}}</div>
            </td>
            <td style="vertical-align: middle"> 
                <div>
                <div>
                    <a href="#item/{{CategoryId}}/{{Id}}/1"><button class="margin-small text-right btn btn-default glyphicon glyphicon-export"></button></a>
                    {{#if ../isFavouriteList}}
                        <button onClick="app_router.favouritesRemove({{Id}}); $(this).parents('tr').remove();" type="button" class="btn btn-default glyphicon glyphicon-minus-sign"></button>
                    {{else}}
                        <button onClick="app_router.favouritesAdd({{CategoryId}}, {{Id}}); $(this).css('visibility', 'hidden');" type="button" class="btn btn-default glyphicon glyphicon-plus-sign"></button>
                    {{/if}}
                    <span onclick="LoadForvoLink('{{Translation1}}', this)" class="pointer btn btn-default btn-sm"> <strong> {{Translation1}} </strong> </span>
                </div>
                {{#if Translation2}}
                <div>
                    <a href="#item/{{CategoryId}}/{{Id}}/2"><button class="margin-small text-right btn btn-default glyphicon glyphicon-export"></button></a>
                    <button type="button" class="btn btn-default glyphicon glyphicon-plus-sign" style="visibility:hidden;" ></button>
                    <span onclick="LoadForvoLink('{{Translation2}}', this)" class="pointer btn btn-default btn-sm"> <strong> {{Translation2}} </strong>  </span>
                </div>
                {{/if}}
                </div> 
            </td>
        </tr>
        {{/each}}
    </table>
</div>    

