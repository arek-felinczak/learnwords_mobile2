<div>
    {{#if showPager}}
    <div class="col-md-4 center">
        <ul class="pagination">
            {{#each pages}}
                <li onclick="return go('{{url}}');" class="pointer">
                    <button {{#if disabled}} disabled="disabled" {{/if}} class="btn {{cssClass}}"> {{page}} </button>
                </li>
            {{/each}}
        </ul>
    </div>
    {{/if}}
    <div id="CategoryListPanel" class='panel panel-default'>
        <div class="panel-heading">
            <strong>{{{breadcrumb}}}</strong>
        </div>
        <div class="panel-body">
            <p>Tap on word to play audio file (internet connection needed).</p>
        </div>        
        <table id="items-table" class="table">
            <colgroup>
                <col class="col-xs-4" />
                <col class="col-xs-2" />
                <col class="col-xs-4" />
            </colgroup>
            {{#each category}}
            <tr>
                <td class='text'>
                    {{pagedGridIndex @index ../offset}}. {{Word}}
                </td>
                 <td class='text'>
                     <p class="link pointer" onclick="return go('#item/{{CategoryId}}/{{Id}}/1');">
                         {{Translation1}}
                     </p>
                      {{#if Translation2}}
                      <p class="link pointer" onclick="return go('#item/{{CategoryId}}/{{Id}}/2');">
                         {{Translation2}}
                      </p>
                      {{/if}}
                </td>
                <td class='button'>
                    <button onclick="LoadForvoLink('{{Translation1}}'); return false;" class="pointer btn btn-default margin-small">
                        <span class="glyphicon glyphicon-bullhorn"></span> play
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
                    <button onclick="LoadForvoLink('{{Translation2}}'); return false;" class="pointer btn btn-default margin-small"> 
                        <span class="glyphicon glyphicon-bullhorn"></span> play
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
                    <button {{#if disabled}} disabled="disabled" {{/if}} class="btn {{cssClass}}"> {{page}} </button>
                </li>
            {{/each}}
        </ul>
    </div>
    {{/if}}
</div>