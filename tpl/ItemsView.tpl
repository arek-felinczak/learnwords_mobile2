<div>
    {{#if showPager}}
    <div class="col-xs-12">
        {{{pagerHtml}}}
    </div>
    {{/if}}
    <div id="CategoryListPanel" class='panel panel-default'>
        <div class="panel-heading">
            {{{breadcrumb}}}           
            {{#if isFavouriteList}} {{else}}
            <button style='cursor: pointer; float: right' onClick="app_router.navigate('#itemAddForm/{{CategoryId}}/{{page}}', true); return false;" 
                    class="btn btn-default btn-lg text-right">
                <span class="glyphicon glyphicon-plus"><br/>
                    <span class="text-small">new</span></span>
            </button>
            {{/if}}
        </div>
        <div class="panel-body hidden" id="helpDiv">
            <button class="btn btn-default btn-lg btn-block" onClick="app_router.navigate('#DictSelect', true); return false;"> <span class="glyphicon glyphicon-list-alt padding-small"></span> change speech engine </button>
            <p> Tap on <span class="glyphicon glyphicon-bullhorn padding-small"></span> to play audio file.</p>
            <p> Tap on <span class="glyphicon glyphicon-folder-open padding-small"></span> to open word in external dictionary.</p>
            <p> Use <span class="glyphicon glyphicon-plus-sign padding-small"></span> to add word to favourite list.</p>
            <p> Button above list <span class="glyphicon glyphicon-plus padding-small"></span> opens add new word form.</p>                
        </div>        
        <table id="items-table" class="table">
            <colgroup>
                <col class="col-xs-5" />
                <col class="col-xs-3" />
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
                    {{pagedGridIndex @index ../offset}}. {{Word}} <br/>
                     {{#if ../isFavouriteList}}
                        <button onclick="app_router.favouritesRemove({{Id}}); $(this).parents('tr').remove(); return false;" 
                                type="button" class="pointer btn btn-default btn-lg margin-small">
                            <span class="glyphicon glyphicon-minus-sign"><span class="text-small" style="padding-left: 3px">rem.</span></span>
                        </button>
                        {{else}}
                        <button onClick="app_router.favouritesAdd({{CategoryId}}, {{Id}}); $(this).css('visibility', 'hidden'); return false;" 
                                type="button" class="pointer btn btn-default btn-lg margin-small">
                            <span class="glyphicon glyphicon-plus-sign"><span class="text-small" style="padding-left: 3px">add</span></span>
                        </button>
                    {{/if}}
                </td>
                <td class='button' style="min-width: 120px">
                    <button name="open-dict" data-word-num="1" data-category-id="{{CategoryId}}" data-item-id="{{Id}}"
                             class="pointer btn btn-default btn-lg margin-small">
                         <span class="glyphicon glyphicon-folder-open"><br />
                             <span class="text-small">open</span>
                         </span>
                    </button>
                    <button name="play-audio" data-word="{{Translation1}}" data-category-id="{{CategoryId}}" data-item-id="{{Id}}" 
                            class="pointer btn btn-default btn-lg margin-small">
                        <span class="glyphicon glyphicon-bullhorn"><br />
                            <span class="text-small">play</span></span>
                    </button> 
                    {{#if Translation2}}
                    <br />                    
                    <button name="open-dict" data-word-num="2" data-category-id="{{CategoryId}}" data-item-id="{{Id}}"
                            class="btn btn-default btn-lg pointer margin-small">
                        <span class="glyphicon glyphicon-folder-open"><br />
                            <span class="text-small">open</span></span>
                    </button>
                    <button name="play-audio" data-word="{{Translation2}}" data-category-id="{{CategoryId}}" data-item-id="{{Id}}" 
                            class="pointer btn btn-default btn-lg margin-small"> 
                        <span class="glyphicon glyphicon-bullhorn"><br />
                            <span class="text-small">play</span></span>
                    </button>
                    {{/if}}                    
                 </td>
                 
                <td class='text'>
                    <p>{{Translation1}}</p>
                    {{#if Translation2}}<br />
                     <p>{{Translation2}}</p>
                    {{/if}}  
                </td>
            </tr>
            {{/each}}
        </table>
    </div>    
    {{#if showPager}}
    <div class="col-xs-12">
        {{{pagerHtml}}}
    </div>
    {{/if}}
</div>