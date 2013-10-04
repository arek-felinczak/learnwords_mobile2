<div>
    {{#if showPager}}
    <div class="col-xs-10 center">
        <ul class="center pagination">
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
            <strong>{{{breadcrumb}}}</strong>
        </div>
        <div class="panel-body">
            <small>Tap on bullhorn icon to play audio file (internet connection needed). Use plus sign button to add
                word to favourite list. Tap blue link to open word in external dictionary.</small>
            
        </div>        
        <table id="items-table" class="table">
            <colgroup>
                <col class="col-xs-4" />
                <col class="col-xs-2" />
                <col class="col-xs-4" />
            </colgroup>
            {{#if emptyList}}
             <tr colspan='3'>
                <td class='text'><h4> List if empty. </h4></td>
             </tr>
            {{/if}}
            {{#each category}}
            <tr>
                <td class='text'>
                    {{pagedGridIndex @index ../offset}}. {{Word}}
                </td>
                 <td class='button'>
                     <button class="pointer btn btn-default margin-small" onclick="return go('#item/{{CategoryId}}/{{Id}}/1');">
                         {{Translation1}}
                     </button>
                     <br />{{#if Translation2}}
                      <button class="btn btn-default pointer margin-small" onclick="return go('#item/{{CategoryId}}/{{Id}}/2');">
                         {{Translation2}}
                      </button>
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
    <div class="col-xs-10 center">
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