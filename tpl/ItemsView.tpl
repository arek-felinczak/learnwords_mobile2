{{#if showPager}}
<div class="col-md-4 center">
    <ul class="pagination">
        {{#each pages}}
            <li onclick="return go('{{url}}');" class="pointer">
                <button {{#if disabled}} disabled="disabled" {{/if}} class="btn {{cssClass}} btn-lg"> {{page}} </button>
            </li>
        {{/each}}
    </ul>
</div>
{{/if}}
<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading">
        <strong>{{categoryName}}</strong>
    </div>
    <div class="panel-body">
        <p>Tap on word to play audio file (internet connection needed).</p>
    </div>        
    <table id="items-table" class="table">
        <colgroup>
            <col class="col-lg-4 col-xs-4" />
            <col class="col-lg-8 col-xs-8" />
        </colgroup>
        {{#each category}}
        <tr>
            <td onclick="LoadForvoLink('{{Translation1}}'); return false;" class="pointer">
                <div class="margin-medium">{{pagedGridIndex @index ../offset}}. {{Word}}</div>
            </td>
            <td style="vertical-align: middle"> 
                <div>
                <div>
                    <a onclick="return go('#item/{{CategoryId}}/{{pagedGridIndex @index ../offset}}/1');" href="#"><button class="margin-small text-right btn btn-default glyphicon glyphicon-export"></button></a>
                    {{#if ../isFavouriteList}}
                    <button onclick="app_router.favouritesRemove({{Id}}); $(this).parents('tr').remove(); return false;" type="button" class="btn btn-default glyphicon glyphicon-minus-sign"></button>
                    {{else}}
                    <button onClick="app_router.favouritesAdd({{CategoryId}}, {{Id}}); $(this).css('visibility', 'hidden'); return false;" type="button" class="btn btn-default glyphicon glyphicon-plus-sign"></button>
                    {{/if}}
                    <button onclick="LoadForvoLink('{{Translation1}}'); return false;" class="pointer btn btn-default btn-sm"> <strong> {{Translation1}} </strong> </button>
                </div>
                {{#if Translation2}}
                <div>
                    <a onclick="return go('#item/{{CategoryId}}/{{Id}}/2');" href="#"><button class="margin-small text-right btn btn-default glyphicon glyphicon-export"></button></a>
                    <button type="button" class="btn btn-default glyphicon glyphicon-plus-sign" style="visibility:hidden;" ></button>
                    <button onclick="LoadForvoLink('{{Translation2}}'); return false;" class="pointer btn btn-default btn-sm"> <strong> {{Translation2}} </strong> </button>
                </div>
                {{/if}}
                </div> 
            </td>
        </tr>
        {{/each}}
    </table>
</div>    
{{#if showPager}}
<div class="col-md-4 center">
    <ul class="pagination">
        {{#each pages}}
        <li onclick="return go('{{url}}');" class="{{#if active}}active {{/if}}{{#if disabled}}disabled{{/if}}">
            <a onclick="return go('{{url}}');" href="#">{{page}}</a>
        </li>
        {{/each}}
    </ul>
</div>
{{/if}}
