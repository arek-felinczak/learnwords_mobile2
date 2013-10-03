<div>
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
                <col class="col-xs-4" />
                <col class="col-xs-1" />
                <col class="col-xs-4" />
            </colgroup>
            {{#each category}}
            <tr>
                <td class='text'>
                    {{pagedGridIndex @index ../offset}}. {{Word}}
                </td>
                <td class='button'>
                    <button onclick="LoadForvoLink('{{Translation1}}'); return false;" class="pointer btn btn-default margin-small">
                        <span class="glyphicon glyphicon-bullhorn"></span> {{Translation1}}
                    </button>
                    {{#if Translation2}}
                    <br />
                    <button onclick="LoadForvoLink('{{Translation2}}'); return false;" class="pointer btn btn-default margin-small"> 
                        <span class="glyphicon glyphicon-bullhorn"></span> {{Translation2}}
                    </button>
                    {{/if}}
                </td>
                <td class="button">
                    <button onclick="return go('#item/{{CategoryId}}/{{Id}}/1');" type="button" class="btn btn-default margin-small">
                        <span class="glyphicon glyphicon-hand-right"></span> open 
                    </button>
                    {{#if ../isFavouriteList}}
                    <button onclick="app_router.favouritesRemove({{Id}}); $(this).parents('tr').remove(); return false;" type="button" class="btn btn-default margin-small">
                        <span class="glyphicon glyphicon-minus-sign"></span>
                    </button>
                    {{else}}
                    <button onClick="app_router.favouritesAdd({{CategoryId}}, {{Id}}); $(this).css('visibility', 'hidden'); return false;" type="button" class="btn btn-default margin-small">
                        <span class="glyphicon glyphicon-plus-sign"></span>
                    </button>
                    {{/if}}                
                    {{#if Translation2}}
                    <br />               
                    <button onclick="return go('#item/{{CategoryId}}/{{Id}}/2');" type="button" class="btn btn-default margin-small">
                        <span class="glyphicon glyphicon-hand-right"></span> open 
                    </button>
                    {{/if}}
                </td>
            </tr>
            {{/each}}
        </table>
    </div>    
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
</div>