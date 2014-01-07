<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading">{{{breadcrumb}}}</div>
    <table class="table CategoryList">
        <colgroup>
            <col class="col-xs-9" />
            <col class="col-xs-3" />
        </colgroup>
        {{#each categories}}  
        <tr>
            <td class="link pointer category-link" data-category-id="{{Id}}">
                <span class="glyphicon glyphicon-chevron-right "> {{Name}} </span>
            </td>
            <td class="{{ObjectAtKey ../scoresCss Id}} link pointer test-result-link" 
                data-result='{{ObjectAtKey ../scores Id}}' data-category-id="{{Id}}">
                <span class="badge col-xs-2 center">{{ObjectAtKey ../scores Id}}</span>
            </td>
         </tr>
        {{/each}}
    </table>
</div>        