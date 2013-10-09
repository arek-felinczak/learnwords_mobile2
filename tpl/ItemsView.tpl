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
            <div class="row">
                <div class="col-xs-10">{{{breadcrumb}}}</div>
                <div class="col-xs-2 text-right">
                    <button style='cursor: pointer' onClick="app_router.navigate('#itemAddForm/{{CategoryId}}', true); return false;" class="btn btn-default btn-lg">
                        <span class="glyphicon glyphicon-plus"> </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="panel-body hidden" id="helpDiv">
            <p> Tap on <span class="glyphicon glyphicon-bullhorn"></span> to play audio file.</p>
            <p> Tap on <span class="glyphicon glyphicon-folder-open"></span> to open word in external dictionary.</p>
            <p> Use <span class="glyphicon glyphicon-plus-sign"></span> to add word to favourite list.</p>
            <p> Button above list <span class="glyphicon glyphicon-plus"></span> opens add new word form.</p>                
        </div>        
        <table id="items-table" class="table">
            <colgroup>
                <col class="col-xs-5" />
                <col />
                <col />
                <col />
                <col class="col-xs-4" />
            </colgroup>
            {{#if emptyList}}
             <tr colspan='3'>
                <td class='text'><h4> List if empty. </h4></td>
             </tr>
            {{/if}}
            {{#each category}}
            <tr>
                <td class='text margin-small'>
                    {{pagedGridIndex @index ../offset}}. {{Word}}
                </td>
                <td class='button'>
                    {{#if ../isFavouriteList}}
                        <button onclick="app_router.favouritesRemove({{Id}}); $(this).parents('tr').remove(); return false;" type="button" class="pointer btn btn-default btn-lg margin-small">
                            <span class="glyphicon glyphicon-minus-sign"></span>
                        </button>
                        {{else}}
                        <button onClick="app_router.favouritesAdd({{CategoryId}}, {{Id}}); $(this).css('visibility', 'hidden'); return false;" type="button" class="pointer btn btn-default btn-lg margin-small">
                            <span class="glyphicon glyphicon-plus-sign"></span>
                        </button>
                    {{/if}}
                </td>
                <td class='button'>
                    <button class="pointer btn btn-default btn-lg margin-small" onclick="return go('#item/{{CategoryId}}/{{Id}}/1');">
                        <span class="glyphicon glyphicon-folder-open"></span>
                    </button>
                    {{#if Translation2}}
                    <br />
                    <button class="btn btn-default btn-lg pointer margin-small" onclick="return go('#item/{{CategoryId}}/{{Id}}/2');">
                        <span class="glyphicon glyphicon-folder-open"></span>
                    </button>
                    {{/if}}                         
                </td>
                <td class='button'>
                    <button onclick="LoadForvoLink('{{Translation1}}', {{CategoryId}}, {{Id}}); return false;" class="pointer btn btn-default btn-lg margin-small">
                        <span class="glyphicon glyphicon-bullhorn"></span>
                    </button>               
                    {{#if Translation2}}
                    <br />
                    <button onclick="LoadForvoLink('{{Translation2}}', {{CategoryId}}, {{Id}}); return false;" class="pointer btn btn-default btn-lg margin-small"> 
                        <span class="glyphicon glyphicon-bullhorn"></span>
                    </button>
                    {{/if}}                         
                </td>
                <td class='text margin-small'>
                    {{Translation1}} <br />
                    {{Translation2}}
                </td>
            </tr>
            {{/each}}
        </table>
    </div>    
    {{#if showPager}}
    <div class="col-xs-10 center">
        <ul class="pagination">
            {{#each pages}}
                <li onclick="$('html, body').animate({scrollTop: 0}, 1000); return go('{{url}}');" class="pointer">
                    <button {{#if disabled}} disabled="disabled" {{/if}} class="btn {{cssClass}} btn-lg"> {{page}} </button>
                </li>
            {{/each}}
        </ul>
    </div>
    {{/if}}
</div>