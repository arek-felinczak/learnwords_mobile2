<div class="col-md-4 center">
    <ul class="pagination">
        {{#each pages}}
            <li class="{{#if active}}active {{/if}}{{#if disabled}}disabled{{/if}}">
                <a href="{{url}}">{{page}}</a>
            </li>
        {{/each}}
    </ul>
</div>
<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading">
        <strong id="CategoryNameHeader"></strong>
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
            <td word="{{Translation1}}" class="pointer play-selector">
                <div class="margin-medium">{{pagedGridIndex @index ../offset}}. {{Word}}</div>
            </td>
            <td style="vertical-align: middle"> 
                <div>
                <div>
                    <button href="#item/{{CategoryId}}/{{Id}}/1" class="navigate margin-small text-right btn btn-default glyphicon glyphicon-export"></button>
                    {{#if ../isFavouriteList}}
                        <button word-id="{{Id}}" id='remove-favourites' type="button" class="btn btn-default glyphicon glyphicon-minus-sign"></button>
                    {{else}}
                        <button id="add-favourites" word-id="{{Id}}" cat-id="{{CategoryId}}" type="button" class="btn btn-default glyphicon glyphicon-plus-sign"></button>
                    {{/if}}
                    <span word="{{Translation1}}" class="play-selector pointer btn btn-default btn-sm"> <strong> {{Translation1}} </strong> </span>
                </div>
                {{#if Translation2}}
                <div>
                    <button href="#item/{{CategoryId}}/{{Id}}/2" class="navigate margin-small text-right btn btn-default glyphicon glyphicon-export"></button>
                    <button type="button" class="btn btn-default glyphicon glyphicon-plus-sign" style="visibility:hidden;" ></button>
                    <span word='{{Translation2}}' class="play-selector pointer btn btn-default btn-sm"> <strong> {{Translation2}} </strong>  </span>
                </div>
                {{/if}}
                </div> 
            </td>
        </tr>
        {{/each}}
    </table>
</div>    

